const { callContract, resolveAddressFromDb, colors } = require("../core/runner");
require("dotenv").config();

// Minimal ABI for IAddressListRegistry.createList(address,uint8,address[])
const REGISTRY_ABI = [
  "function createList(address owner, uint8 updateType, address[] initialItems) external",
];

const UPDATE_TYPE_ADD_AND_REMOVE = 3;

async function runCreateList() {
  const registryAddress = await resolveAddressFromDb({ contractName: "AddressListRegistry" });
  const dispatcherAddress = await resolveAddressFromDb({ contractName: "Dispatcher" });

  const initialItems = [];

  console.log(colors.cyan(`AddressListRegistry: ${registryAddress}`));
  console.log(colors.cyan(`Owner (Dispatcher): ${dispatcherAddress}`));

  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: registryAddress,
    abi: REGISTRY_ABI,
    method: "createList",
    args: [dispatcherAddress, UPDATE_TYPE_ADD_AND_REMOVE, initialItems],
    noOpRevertMatchers: [/already.*list|duplicate/i],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (noOp) {
      console.log(colors.yellow("No-op: List already exists. Skipping transaction."));
      return null;
    }
    console.log(colors.red("Aborting without sending transaction due to simulation revert."));
    return null;
  }
  
  // createList returns the list ID
  const listId = staticResult ? staticResult.toString() : null;
  if (listId !== null) {
    console.log(colors.cyan(`Created list ID: ${listId}`));
  }
  if (typeof estimatedGas !== "undefined") console.log(colors.cyan(`Estimated gas: ${estimatedGas.toString()}`));
  console.log(colors.green(`Submitted tx: ${txHash}`));
  if (explorerUrl) console.log(colors.green(`Explorer: ${explorerUrl}`));
  console.log(colors.green(`Confirmed in block ${receipt.blockNumber}`));
  
  return listId;
}

async function main() {
  await runCreateList();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runCreateList };
