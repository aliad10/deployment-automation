const { callContract, resolveAddressFromDb, colors, resolveRpcUrl } = require("../core/runner");
const { constructorData } = require("../../consts");
require("dotenv").config();

// Minimal ABI for IFundDeployer.createNewFund(...)
const FUND_DEPLOYER_ABI = [
  "function createNewFund(address _fundOwner, string calldata _fundName, string calldata _fundSymbol, address _denominationAsset, uint256 _sharesActionTimelock, bytes calldata _feeManagerConfigData, bytes calldata _policyManagerConfigData) external returns (address comptrollerProxy_, address vaultProxy_)",
];

async function getChainFromRpc() {
  const rpcUrl = await resolveRpcUrl();
  if (rpcUrl.includes("sepolia")) return "SEPOLIA";
  if (rpcUrl.includes("arbitrum")) return "ARBITRUM";
  return "ETHEREUM"; // default
}

async function runNewFund() {
  // Static fund configuration values
  const fundOwner = "0x31A1Ed908C39999ca3E495cc3B1D05f16CfAD126";
  const fundName = "ariza";
  const fundSymbol = "IZA";
  const sharesActionTimelock = 0;
  const feeManagerConfigData = "0x";
  const policyManagerConfigData = "0x";

  const resolvedFundDeployer = await resolveAddressFromDb({ contractName: "FundDeployer" });
  
  // Determine chain and get denomination asset
  const chain = await getChainFromRpc();
  const denominationAsset = constructorData[chain]?.WETH;
  
  if (!denominationAsset) {
    throw new Error(`Denomination asset not found. Please set WETH in consts.js for chain: ${chain}`);
  }

  console.log(colors.cyan(`FundDeployer: ${resolvedFundDeployer}`));
  console.log(colors.cyan(`Fund Owner: ${fundOwner}`));
  console.log(colors.cyan(`Fund Name: ${fundName}`));
  console.log(colors.cyan(`Fund Symbol: ${fundSymbol}`));
  console.log(colors.cyan(`Denomination Asset: ${denominationAsset}`));
  console.log(colors.cyan(`Shares Action Timelock: ${sharesActionTimelock}`));
  console.log(colors.cyan(`Chain: ${chain}`));

  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: resolvedFundDeployer,
    abi: FUND_DEPLOYER_ABI,
    method: "createNewFund",
    args: [
      fundOwner,
      fundName,
      fundSymbol,
      denominationAsset,
      sharesActionTimelock,
      feeManagerConfigData,
      policyManagerConfigData,
    ],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (simulation.data) {
      console.log(colors.red(`Error data: ${simulation.data}`));
    }
    if (noOp) {
      console.log(colors.yellow("No-op: Fund creation skipped. Skipping transaction."));
      return;
    }
    console.log(colors.red("Aborting without sending transaction due to simulation revert."));
    return;
  }
  
  if (typeof staticResult !== "undefined") {
    // createNewFund returns a tuple (comptrollerProxy, vaultProxy)
    const [comptrollerProxy, vaultProxy] = staticResult || [];
    console.log(colors.cyan(`Static simulation result:`));
    console.log(colors.cyan(`  Comptroller Proxy: ${comptrollerProxy}`));
    console.log(colors.cyan(`  Vault Proxy: ${vaultProxy}`));
  }
  
  if (typeof estimatedGas !== "undefined") {
    console.log(colors.cyan(`Estimated gas: ${estimatedGas.toString()}`));
  }
  
  console.log(colors.green(`Submitted tx: ${txHash}`));
  if (explorerUrl) {
    console.log(colors.green(`Explorer: ${explorerUrl}`));
  }
  console.log(colors.green(`Confirmed in block ${receipt.blockNumber}`));
  
  // Get the actual return values from the transaction receipt
  // Note: We need to decode the return values from the transaction
  // For now, we'll log what we can from the receipt
  if (receipt) {
    console.log(colors.green(`Transaction confirmed. Check the contract events for Comptroller and Vault proxy addresses.`));
  }
}

// CLI entry
async function main() {
  await runNewFund();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runNewFund };

