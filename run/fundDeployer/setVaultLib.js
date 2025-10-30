const { callContract, resolveAddressFromDb, colors } = require("../core/runner");
require("dotenv").config();

// Minimal ABI for IFundDeployer.setVaultLib(address)
const FUND_DEPLOYER_ABI = [
  "function setVaultLib(address vaultLib) external",
];

async function runSetVaultLib() {
  const resolvedFundDeployer = await resolveAddressFromDb({ contractName: "FundDeployer" });
  const resolvedVaultLib = await resolveAddressFromDb({ contractName: "VaultLib" });

  console.log(colors.cyan(`FundDeployer: ${resolvedFundDeployer}`));
  console.log(colors.cyan(`VaultLib: ${resolvedVaultLib}`));

  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: resolvedFundDeployer,
    abi: FUND_DEPLOYER_ABI,
    method: "setVaultLib",
    args: [resolvedVaultLib],
    noOpRevertMatchers: [/already.*vault.*lib/i],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (noOp) {
      console.log(colors.yellow("No-op: VaultLib already set. Skipping transaction."));
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
  await runSetVaultLib();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runSetVaultLib };
