const { callContract, resolveAddressFromDb, colors, resolveRpcUrl } = require("../core/runner");
const { constructorData } = require("../../consts");
require("dotenv").config();

// Minimal ABI for IValueInterpreter.setEthUsdAggregator(address)
const VALUE_INTERPRETER_ABI = [
  "function setEthUsdAggregator(address aggregator) external",
];

async function getChainFromRpc() {
  const rpcUrl = await resolveRpcUrl();
  if (rpcUrl.includes("sepolia")) return "SEPOLIA";
  if (rpcUrl.includes("arbitrum")) return "ARBITRUM";
  return "ETHEREUM"; // default
}

async function runSetEthUsd() {
  const resolvedValueInterpreter = await resolveAddressFromDb({ contractName: "ValueInterpreter" });
  console.log(colors.cyan(`ValueInterpreter: ${resolvedValueInterpreter}`));
  
  // Determine chain from RPC URL
  const chain = await getChainFromRpc();
  const aggregator = constructorData[chain]?.ETH_USD_AGGREGATOR;
  
  if (!aggregator) {
    throw new Error(`ETH_USD_AGGREGATOR not found for chain: ${chain}`);
  }
  
  console.log(colors.cyan(`Chain: ${chain}`));
  console.log(colors.cyan(`ETH/USD Aggregator: ${aggregator}`));
  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: resolvedValueInterpreter,
    abi: VALUE_INTERPRETER_ABI,
    method: "setEthUsdAggregator",
    args: [aggregator],
    noOpRevertMatchers: [/already.*(eth|usd).*aggregator/i],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (simulation.data) {
      console.log(colors.red(`Error data: ${simulation.data}`));
    }
    if (noOp) {
      console.log(colors.yellow("No-op: ETH/USD aggregator already set. Skipping transaction."));
      return;
    }
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
  const [aggregator] = process.argv.slice(2);
  await runSetEthUsd({ aggregator });
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runSetEthUsd };
