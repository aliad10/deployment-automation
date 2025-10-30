const { callContract, resolveAddressFromDb, colors } = require("../core/runner");
const fs = require("fs");
require("dotenv").config();

// Minimal ABI for IValueInterpreter.updatePrimitives(address[],address[],uint8[])
const VALUE_INTERPRETER_ABI = [
  "function updatePrimitives(address[] primitives, address[] aggregators, uint8[] rateAssets) external",
];

function parseArraysFromJson(jsonPath) {
  const raw = fs.readFileSync(jsonPath, "utf8");
  const obj = JSON.parse(raw);
  const { primitives, aggregators, rateAssets } = obj || {};
  if (!Array.isArray(primitives) || !Array.isArray(aggregators) || !Array.isArray(rateAssets)) {
    throw new Error("JSON file must include arrays: primitives, aggregators, rateAssets");
  }
  return { primitives, aggregators, rateAssets };
}

async function runUpdatePrimitives({ jsonPath } = {}) {
  const resolvedValueInterpreter = await resolveAddressFromDb({ contractName: "ValueInterpreter" });

  if (!jsonPath) {
    throw new Error("Provide a JSON file path containing primitives, aggregators, rateAssets");
  }

  const { primitives, aggregators, rateAssets } = parseArraysFromJson(jsonPath);

  if (!(primitives.length === aggregators.length && aggregators.length === rateAssets.length)) {
    throw new Error("primitives, aggregators, rateAssets must have the same length");
  }

  console.log(colors.cyan(`ValueInterpreter: ${resolvedValueInterpreter}`));
  console.log(colors.cyan(`Primitives: ${primitives.length}, Aggregators: ${aggregators.length}, RateAssets: ${rateAssets.length}`));

  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: resolvedValueInterpreter,
    abi: VALUE_INTERPRETER_ABI,
    method: "updatePrimitives",
    args: [primitives, aggregators, rateAssets],
    noOpRevertMatchers: [/no\s*change/i, /already.*primitive/i],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (noOp) {
      console.log(colors.yellow("No-op: Primitives already configured as provided. Skipping transaction."));
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
  const [jsonPath] = process.argv.slice(2);
  await runUpdatePrimitives({ jsonPath });
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runUpdatePrimitives };
