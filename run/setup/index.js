const { runSetCurrentFund } = require("../dispather/setCurrentFund");
const { runSetComptrollerLib } = require("../fundDeployer/setComptrollerLib");
const { runSetVaultLib } = require("../fundDeployer/setVaultLib");
const { runSetProtocolFeeTracker } = require("../fundDeployer/setProtocolFeeTracker");
const { runSetReleaseLive } = require("../fundDeployer/setReleaseLive");
const { runSetEthUsd } = require("../valueInterpreter/setEthUsd");
const { runAddPrimitives } = require("../valueInterpreter/addPrimitives");
const { runCreateList } = require("../addressListRegistry/createList");
const { runAddToList } = require("../addressListRegistry/addToList");
const { resolveRpcUrl } = require("../core/runner");
const {constructorData} = require("../../consts");
const { runNewFund } = require("../fundDeployer/newFund");
const { runBuyShare } = require("../comptrolib/buyShare");
require("dotenv").config();



async function getChainFromDeployment() {
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const name = process.env.DEPLOYMENT_NAME;
    if (name) {
      const deployment = await prisma.deployment.findUnique({ where: { name } });
      if (deployment) {
        return deployment.chain.toUpperCase();
      }

      console.log(`Deployment not found: ${deployment}`);

    }
    // Fallback: determine from RPC URL
    const rpcUrl = await resolveRpcUrl();
    if (rpcUrl.includes("sepolia")) return "SEPOLIA";
    if (rpcUrl.includes("arbitrum")) return "ARBITRUM";
    return "ETHEREUM"; // default
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log("Starting post-deployment setup...");
  // Order matters; add more steps here as needed
  // await runSetCurrentFund();
  // await runSetComptrollerLib();
  // await runSetVaultLib();
  // await runSetProtocolFeeTracker();
  // await runSetReleaseLive();
  
  // Set ETH/USD aggregator based on chain
  // await runSetEthUsd();
  // await runAddPrimitives();
  // await runCreateList();
  // await runCreateList();
  // await runCreateList();
  // await runCreateList();
  // await runCreateList();
  // await runCreateList();      
  // await runAddToList(); //deposit wrapper
  // await runAddToList(); 

  // await runNewFund();
  await runBuyShare();

  console.log("Post-deployment setup complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


