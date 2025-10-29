const { PrismaClient } = require("@prisma/client");
const { getConstructorValues, getConstructorDataValue } = require("./helper");
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

  if (!deploymentData) {
    throw new Error(
      `Deployment "${deploymentName}" not found. Please seed deployments first with: make seed-deployment`
    );
  }

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

  // Dynamically get RPC URL based on chain, fallback to generic RPC_URL
  const rpcUrlEnvKey = `RPC_URL_${deploymentData.chain}`;
  const rpcUrl = process.env[rpcUrlEnvKey] || process.env.RPC_URL;
  
  if (!rpcUrl) {
    throw new Error(
      `RPC URL not found. Please set ${rpcUrlEnvKey} or RPC_URL in your .env file`
    );
  }

  console.log(`Using RPC URL for chain: ${deploymentData.chain}`);
  
  if (contracts.length === 0) {
    console.log(`✅ No contracts to deploy for ${deploymentName}. All contracts are already deployed.`);
    return;
  }

  console.log(`Found ${contracts.length} contract(s) to deploy`);
  const provider = new ethers.JsonRpcProvider(rpcUrl);
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
            `./abi/${item.version}/artifacts/${item.path}.sol/${item.path}.json`,
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

  // Generate CSV file after deployment
  await generateCSV(deploymentData);
}

async function generateCSV(deploymentData) {
  try {
    const deployedContracts = await prisma.deployedContract.findMany({
      where: {
        deploymentId: deploymentData.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (deployedContracts.length === 0) {
      console.log("No deployed contracts found. Skipping CSV generation.");
      return;
    }

    // CSV headers
    const headers = [
      "Contract Name",
      "Contract Address",
      "Gas Used",
      "Fee (Wei)",
      "Fee (ETH)",
      "Chain",
      "Chain ID",
      "Deployment Name",
      "Deployed At",
    ];

    // CSV rows
    const rows = deployedContracts.map((contract) => {
      const feeEth = ethers.formatEther(contract.fee.toString());
      const deployedAt = contract.createdAt.toISOString();

      return [
        contract.contractName,
        contract.address,
        contract.gasUsed.toString(),
        contract.fee.toString(),
        feeEth,
        deploymentData.chain,
        deploymentData.chainId.toString(),
        deploymentData.name,
        deployedAt,
      ];
    });

    // Escape CSV fields (handle commas, quotes, newlines)
    const escapeCsvField = (field) => {
      if (typeof field !== "string") field = String(field);
      if (field.includes(",") || field.includes('"') || field.includes("\n")) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    // Build CSV content
    const csvContent = [
      headers.map(escapeCsvField).join(","),
      ...rows.map((row) => row.map(escapeCsvField).join(",")),
    ].join("\n");

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").split("T")[0];
    const filename = `deployment-${deploymentData.name}-${timestamp}.csv`;

    // Write CSV file
    fs.writeFileSync(filename, csvContent, "utf8");
    console.log(`\n📄 CSV file generated: ${filename}`);
    console.log(`   Total contracts: ${deployedContracts.length}`);
  } catch (error) {
    console.error("❌ Error generating CSV file:", error);
    // Don't throw - CSV generation failure shouldn't break deployment
  }
}

const deploymentName = process.argv[2] || "ethereum-deployment";

main(deploymentName)
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
