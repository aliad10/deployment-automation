const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding deployments...");
  const deploymentData = [
    {
      name: "sepolia-deployment",
      chain: "ARBITRUM",
      chainId: 42161,
    },
    {
      name: "ethereum-deployment",
      chain: "ETHEREUM",
      chainId: 1,
    },
  ];

  for (const deployment of deploymentData) {
    await prisma.deployment.create({
      data: {
        name: deployment.name,
        chain: deployment.chain,
        chainId: deployment.chainId,
      },
    });
  }

  console.log("Deployments have been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
