const { callContract, resolveAddressFromDb, colors } = require("../core/runner");
require("dotenv").config();

// Minimal ABI for IDispatcher.setCurrentFundDeployer(address)
const DISPATCHER_ABI = [
  "function setCurrentFundDeployer(address fundDeployer) external",
];

async function runSetCurrentFund({ dispatcherAddress, fundDeployerAddress } = {}) {
  // Resolve dispatcher address: FORCE from DB (ignore CLI/env)
  const dispatcherContractName = process.env.CONTRACT_NAME || process.env.DISPATCHER_CONTRACT_NAME || "Dispatcher";
  const deploymentName = process.env.DEPLOYMENT_NAME;
  const resolvedDispatcher = await resolveAddressFromDb({
    contractName: dispatcherContractName,
    deploymentName,
  });

  // Resolve fund deployer address: provided > env > DB
  let resolvedFundDeployer = fundDeployerAddress || process.env.FUND_DEPLOYER;
  if (!resolvedFundDeployer) {
    const fundDeployerContractName = process.env.FUND_DEPLOYER_CONTRACT_NAME || "FundDeployer";
    const deploymentName = process.env.DEPLOYMENT_NAME;
    resolvedFundDeployer = await resolveAddressFromDb({
      contractName: fundDeployerContractName,
      deploymentName,
    });
  }

  console.log(colors.cyan(`Dispatcher: ${resolvedDispatcher}`));
  console.log(colors.cyan(`FundDeployer: ${resolvedFundDeployer}`));

  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl } = await callContract({
    contractAddress: resolvedDispatcher,
    abi: DISPATCHER_ABI,
    method: "setCurrentFundDeployer",
    args: [resolvedFundDeployer],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    // Idempotency: if it's already current, treat as success and exit
    if (simulation.reason && simulation.reason.toLowerCase().includes("already currentfunddeployer")) {
      console.log(colors.yellow("No-op: Dispatcher already set to this FundDeployer. Skipping transaction."));
      return;
    }
    // Otherwise, stop here without sending
    console.log(colors.red("Aborting without sending transaction due to simulation revert."));
    return;
  }
  if (typeof staticResult !== "undefined") console.log(colors.cyan(`Static simulation result: ${JSON.stringify(staticResult)}`));
  if (typeof estimatedGas !== "undefined") console.log(colors.cyan(`Estimated gas: ${estimatedGas.toString()}`));
  console.log(colors.green(`Submitted tx: ${txHash}`));
  if (explorerUrl) console.log(colors.green(`Explorer: ${explorerUrl}`));
  console.log(colors.green(`Confirmed in block ${receipt.blockNumber}`));
}

// CLI entry
async function main() {
  const [dispatcherFromArg, fundDeployerFromArg] = process.argv.slice(2);
  await runSetCurrentFund({
    dispatcherAddress: dispatcherFromArg,
    fundDeployerAddress: fundDeployerFromArg,
  });
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runSetCurrentFund };


