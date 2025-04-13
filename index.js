const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const { log } = require("console");
const { ethers } = require("ethers");
const fs = require("fs");
const { getConstructorValues } = require("./heper");

async function main(deploymentName) {
  const deploymentData = await prisma.deployment.findUnique({
    where: {
      name: deploymentName,
    },
  });

  const contracts = await prisma.contract.findMany({
    where: {
      chain: deploymentData.chain,
      chainId: deploymentData.chainId,
    },
  });

  const orderedContracts = contracts.sort((a, b) => a.order - b.order);
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  for (const item of orderedContracts) {
    const artifact = JSON.parse(
      fs.readFileSync(
        `./abi/${item.version}/artifacts/${item.name}.sol/${item.name}.json`,
        "utf8"
      )
    );
    console.log("Deploying contract...");
    const factory = new ethers.ContractFactory(
      artifact.abi,
      artifact.bytecode,
      wallet
    );
    let constractorValues = [];
    if (item.data) {
      constractorValues = getConstructorValues(item.data);
    }

    const contract = await factory.deploy(...constractorValues);
    await contract.waitForDeployment();

    const receipt = await provider.getTransactionReceipt(
      contract.deploymentTransaction().hash
    );

    // Ensure gasUsed exists in the receipt
    const gasUsed = receipt.gasUsed;
    if (!gasUsed) {
      console.error("Failed to retrieve gasUsed from receipt");
      return;
    }

    // Retrieve gasPrice, fallback to current network price if not available
    let gasPrice = receipt.gasPrice;
    if (!gasPrice) {
      gasPrice = await provider.getGasPrice();
    }

    // Convert BigNumber to BigInt for calculation
    const gasFee = BigInt(gasUsed.toString()) * BigInt(gasPrice.toString());
    const contractAddress = await contract.getAddress();

    console.log(`✅ Contract deployed at: ${contractAddress}`);
    //log account balance

    console.log("item", item);
    if (item.updateName) {
      const rows = await prisma.contract.findMany({
        where: {
          chain: deploymentData.chain,
          chainId: deploymentData.chainId,
          AND: [
            {
              data: {
                path: [item.updateName],
                not: null,
              },
            },
            {
              data: {
                path: [item.updateName, "value"],
                not: null,
              },
            },
          ],
        },
      });

      const updates = rows.map((row) => {
        const updatedData = { ...row.data };

        // Only update if x and x.value exists
        if (
          updatedData[item.updateName] &&
          typeof updatedData[item.updateName] === "object"
        ) {
          updatedData[item.updateName].value = contractAddress;
        }

        return prisma.contract.update({
          where: { id: row.id },
          data: { data: updatedData },
        });
      });

      // Step 3: Execute all updates in parallel
      const results = await Promise.all(updates);
      console.log(`Updated ${results.length} rows.`);
    }
    await prisma.deployedContract.create({
      data: {
        deploymentId: deploymentData.id,
        contractId: item.id,
        address: contractAddress,
        fee: gasFee,
      },
    });
  }

  return;
  //   // Example: Create a new Contract
  //   const newContract = await prisma.contract.create({
  //     data: {
  //       deploymentId: 'some-deployment-id',
  //       address: '0x1234567890abcdef',
  //       fee: '0.01',
  //     },
  //   });
  //   console.log('Created contract:', newContract);

  //   // Example: Create a new Deployment
  //   const newDeployment = await prisma.deployment.create({
  //     data: {
  //       name: 'Deployment 1',
  //     },
  //   });
  //   console.log('Created deployment:', newDeployment);

  //log account balance
}

main("sepolia-deployment")
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // await prisma.$disconnect();
  });
