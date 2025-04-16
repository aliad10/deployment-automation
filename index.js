const { PrismaClient } = require("@prisma/client");
const { getConstructorValues, getConstructorDataValue } = require("./heper");
const { ethers } = require("ethers");

require("dotenv").config();

const fs = require("fs");

const prisma = new PrismaClient();

async function main(deploymentName) {
  const deploymentData = await prisma.deployment.findUnique({
    where: {
      name: deploymentName,
    },
  });

  let contractOrder = 0;

  if (deploymentData.lastDeployedContract) {
    const latestDeployedContract = await prisma.contract.findUnique({
      where: {
        id: deploymentData.lastDeployedContract,
      },
    });
    if (latestDeployedContract) {
      contractOrder = latestDeployedContract.order;
    }
  }
  const contracts = await prisma.contract.findMany({
    where: {
      chain: deploymentData.chain,
      chainId: deploymentData.chainId,
      order: {
        gt: contractOrder,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  for (const item of contracts) {
    console.log("deploying ... ", item.name);
    let attempt = 0;
    const maxRetries = 3;
    let deployed = false;

    while (attempt < maxRetries && !deployed) {
      try {
        const artifact = JSON.parse(
          fs.readFileSync(
            `./abi/${item.version}/artifacts/${item.name}.sol/${item.name}.json`,
            "utf8"
          )
        );

        const factory = new ethers.ContractFactory(
          artifact.abi,
          artifact.bytecode,
          wallet
        );
        let constractorValues = [];

        const newContract = await prisma.contract.findUnique({
          where: {
            id: item.id,
          },
        });

        if (newContract.data) {
          constractorValues = getConstructorValues(newContract.data);
        }

        const contract = await factory.deploy(...constractorValues);
        await contract.waitForDeployment();
        const txHash = contract.deploymentTransaction().hash;

        const contractAddress = await contract.getAddress();

        const receipt = await provider.getTransactionReceipt(txHash);

        const gasUsed = receipt.gasUsed;
        if (!gasUsed) {
          console.error("Failed to retrieve gasUsed from receipt");
        }

        let gasPrice = receipt.gasPrice;
        if (!gasPrice) {
          gasPrice = await provider.getGasPrice();
        }

        const gasFee = BigInt(gasUsed.toString()) * BigInt(gasPrice.toString());
        if (item.updateName.length > 0) {
          for (const updateKey of item.updateName) {
            const rows = await prisma.contract.findMany({
              where: {
                chain: deploymentData.chain,
                chainId: deploymentData.chainId,
                AND: [
                  {
                    data: {
                      path: [updateKey],
                      not: null,
                    },
                  },
                  {
                    data: {
                      path: [updateKey, "value"],
                      equals: null,
                    },
                  },
                ],
              },
            });

            await Promise.all(
              rows.map((row) => {
                const updatedData = { ...row.data };

                if (
                  updatedData[updateKey] &&
                  typeof updatedData[updateKey] === "object"
                ) {
                  if (updatedData[updateKey].type === "array") {
                    updatedData[updateKey].value = [contractAddress];
                  } else {
                    updatedData[updateKey].value = contractAddress;
                  }
                }

                return prisma.contract.update({
                  where: { id: row.id },
                  data: { data: updatedData },
                });
              })
            );
          }
        }

        if (item.constructorDataUpdateName) {
          const rows = await prisma.contract.findMany({
            where: {
              chain: deploymentData.chain,
              chainId: deploymentData.chainId,
              AND: [
                {
                  data: {
                    path: [item.constructorDataUpdateName],
                    not: null,
                  },
                },
                {
                  data: {
                    path: [item.constructorDataUpdateName, "value"],
                    equals: null,
                  },
                },
              ],
            },
          });

          await Promise.all(
            rows.map((row) => {
              const updatedData = { ...row.data };

              if (
                updatedData[item.constructorDataUpdateName] &&
                typeof updatedData[item.constructorDataUpdateName] === "object"
              ) {
                updatedData[item.constructorDataUpdateName].value =
                  getConstructorDataValue(contractAddress);
              }

              return prisma.contract.update({
                where: { id: row.id },
                data: { data: updatedData },
              });
            })
          );
        }
        console.log(`✅ Contract deployed at: ${contractAddress}`);
        await prisma.deployment.update({
          where: { id: deploymentData.id },
          data: { lastDeployedContract: item.id },
        });
        await prisma.deployedContract.create({
          data: {
            deploymentId: deploymentData.id,
            contractId: item.id,
            contractName: item.name,
            address: contractAddress,
            fee: gasFee,
            gasUsed: gasUsed,
          },
        });

        deployed = true; // success
      } catch (err) {
        attempt++;
        console.error(
          `❌ Failed to deploy contract [${item.name}] on attempt ${attempt}:`,
          err
        );

        if (attempt === maxRetries) {
          console.error(
            `🛑 Skipping contract [${item.name}] after ${maxRetries} failed attempts.`
          );
          return;
        } else {
          console.log(`🔁 Retrying [${item.name}]...`);
          await new Promise((r) => setTimeout(r, 3000)); // wait 3 seconds before retry
        }
      }
    }
  }
}

main("sepolia-deployment")
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
