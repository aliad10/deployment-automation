const { PrismaClient } = require("@prisma/client");
const { updateName } = require("./enum");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding contracts...");

  const contracts = [
    {
      name: "Dispatcher",
      chain: "ARBITRUM",
      chainId: 42161,
      version: "v4",
      updateName: updateName.DISPATCHER_ADDRESS,
      order: 1,
    },
    {
      name: "UintListRegistry",
      chain: "ARBITRUM",
      chainId: 42161,
      version: "v4",
      order: 2,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: "0x0000000000000000000000000000000000000000",
          order: 1,
        },
      },
    },
  ];

  for (const contractData of contracts) {
    console.log(contractData);
    await prisma.contract.create({
      data: {
        name: contractData.name,
        updateName: contractData.updateName,
        chain: contractData.chain,
        chainId: contractData.chainId,
        version: contractData.version,
        order: contractData.order,
        data: contractData.data,
      },
    });
  }

  console.log("Contracts have been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
