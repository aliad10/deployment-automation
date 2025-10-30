const { callContract, resolveAddressFromDb, colors } = require("../core/runner");
require("dotenv").config();

// Minimal ABI for IValueInterpreter.setEthUsdAggregator(address)
const VALUE_INTERPRETER_ABI = [
  "function setEthUsdAggregator(address aggregator) external",
];

async function runSetEthUsd({ aggregator } = {}) {
  const resolvedValueInterpreter = await resolveAddressFromDb({ contractName: "ValueInterpreter" });

  if (!aggregator) {
    throw new Error("Provide aggregator address as first CLI argument");
  }

  console.log(colors.cyan(`ValueInterpreter: ${resolvedValueInterpreter}`));
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
