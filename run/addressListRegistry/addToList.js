const { callContract, resolveAddressFromDb, colors } = require("../core/runner");
require("dotenv").config();

// Minimal ABI for IAddressListRegistry.addToList(uint256,address[])
const REGISTRY_ABI = [
  "function addToList(uint256 listId, address[] items) external",
];

// Static values matching addToList.s.sol
const LIST_ID = 5; // ALLOWED_EXCHANGES_LIST_ID
const ITEMS = [
  "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57",
];

async function runAddToList() {
  const registryAddress = await resolveAddressFromDb({ contractName: "AddressListRegistry" });

  console.log(colors.cyan(`AddressListRegistry: ${registryAddress}`));
  console.log(colors.cyan(`List ID: ${LIST_ID}`));
  console.log(colors.cyan(`Items: ${ITEMS.length}`));

  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: registryAddress,
    abi: REGISTRY_ABI,
    method: "addToList",
    args: [LIST_ID, ITEMS],
    noOpRevertMatchers: [/already.*listed|duplicate/i],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (noOp) {
      console.log(colors.yellow("No-op: Some or all items already in list. Skipping transaction."));
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

async function main() {
  await runAddToList();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runAddToList };
