const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding deployments...");
  const deploymentData = [
    {
      name: "sepolia-deployment",
      chain: "SEPOLIA",
      chainId: 11155111,
    },
    {
      name: "ethereum-deployment",
      chain: "ETHEREUM",
      chainId: 1,
    },
    {
      name: "arbitrum-deployment",
      chain: "ARBITRUM",
      chainId: 42161,
    },
  ];

  for (const deployment of deploymentData) {
    await prisma.deployment.upsert({
      where: {
        name: deployment.name,
      },
      update: {
        chain: deployment.chain,
        chainId: deployment.chainId,
      },
      create: {
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
