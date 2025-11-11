const { callContract, getWalletAndProvider, getContract, colors, resolveRpcUrl } = require("../core/runner");
const { constructorData } = require("../../consts");
const { ethers } = require("ethers");
require("dotenv").config();

// Minimal ABI for IComptroller.buyShares(...)
const COMPTROLLER_ABI = [
  "function buyShares(uint256 _investmentAmount, uint256 _minSharesQuantity) external returns (uint256 sharesReceived_)",
  "function getDenominationAsset() external view returns (address denominationAsset_)",
  "function getVaultProxy() external view returns (address vaultProxy_)",
];

// ERC20 ABI for WETH approval and balance checks
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

async function getChainFromRpc() {
  const rpcUrl = await resolveRpcUrl();
  if (rpcUrl.includes("sepolia")) return "SEPOLIA";
  if (rpcUrl.includes("arbitrum")) return "ARBITRUM";
  return "ETHEREUM"; // default
}

async function runBuyShare() {
  // Static configuration values
  const vaultName = "ariza";
  const investmentAmount = ethers.parseEther("0.000001"); // 0.0001 WETH
  const minSharesQuantity = 1; // Minimum shares to receive

  // Get chain and vault info
  const chain = await getChainFromRpc();
  const vaultInfo = constructorData[chain]?.VAULTS?.[vaultName];
  
  if (!vaultInfo) {
    throw new Error(`Vault "${vaultName}" not found in consts.js for chain: ${chain}`);
  }

  const comptrollerProxy = vaultInfo.comptrollerProxy;
  const vaultProxy = vaultInfo.vaultProxy;
  const wethAddress = constructorData[chain]?.WETH;

  if (!wethAddress) {
    throw new Error(`WETH address not found in consts.js for chain: ${chain}`);
  }

  const { wallet, rpcUrl } = await getWalletAndProvider();
  const network = await wallet.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log(colors.cyan(`Chain: ${chain}`));
  console.log(colors.cyan(`Comptroller Proxy: ${comptrollerProxy}`));
  console.log(colors.cyan(`Vault Proxy: ${vaultProxy}`));
  console.log(colors.cyan(`WETH Address: ${wethAddress}`));
  console.log(colors.cyan(`Investment Amount: ${ethers.formatEther(investmentAmount)} WETH`));
  console.log(colors.cyan(`Min Shares Quantity: ${minSharesQuantity}`));
  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));

  // Get WETH contract
  const wethContract = getContract(wethAddress, ERC20_ABI, wallet);
  
  // Check WETH balance
  const wethBalance = await wethContract.balanceOf(wallet.address);
  console.log(colors.cyan(`WETH Balance: ${ethers.formatEther(wethBalance)} WETH`));

  if (wethBalance < investmentAmount) {
    throw new Error(`Insufficient WETH balance. Have ${ethers.formatEther(wethBalance)}, need ${ethers.formatEther(investmentAmount)}`);
  }

  // Check current allowance
  const currentAllowance = await wethContract.allowance(wallet.address, comptrollerProxy);
  console.log(colors.cyan(`Current Allowance: ${ethers.formatEther(currentAllowance)} WETH`));

  // Approve WETH if needed
  if (currentAllowance < investmentAmount) {
    console.log(colors.yellow(`Approving WETH for Comptroller...`));
    const approveAmount = investmentAmount * BigInt(2); // Approve 2x to avoid frequent approvals
    
    const { txHash: approveTxHash, receipt: approveReceipt, explorerUrl: approveExplorerUrl } = await callContract({
      contractAddress: wethAddress,
      abi: ERC20_ABI,
      method: "approve",
      args: [comptrollerProxy, approveAmount],
    });

    console.log(colors.green(`Approval tx: ${approveTxHash}`));
    if (approveExplorerUrl) {
      console.log(colors.green(`Explorer: ${approveExplorerUrl}`));
    }
    console.log(colors.green(`Approval confirmed in block ${approveReceipt.blockNumber}`));
  } else {
    console.log(colors.yellow(`Sufficient allowance already exists. Skipping approval.`));
  }

  // Call buyShares
  console.log(colors.cyan(`Calling buyShares...`));
  const { txHash, receipt, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: comptrollerProxy,
    abi: COMPTROLLER_ABI,
    method: "buyShares",
    args: [investmentAmount, minSharesQuantity],
  });

  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (simulation.data) {
      console.log(colors.red(`Error data: ${simulation.data}`));
    }
    if (noOp) {
      console.log(colors.yellow("No-op: Buy shares skipped. Skipping transaction."));
      return;
    }
    console.log(colors.red("Aborting without sending transaction due to simulation revert."));
    return;
  }

  if (typeof staticResult !== "undefined") {
    console.log(colors.cyan(`Static simulation result: ${staticResult.toString()} shares`));
  }

  if (typeof estimatedGas !== "undefined") {
    console.log(colors.cyan(`Estimated gas: ${estimatedGas.toString()}`));
  }

  console.log(colors.green(`Submitted tx: ${txHash}`));
  if (explorerUrl) {
    console.log(colors.green(`Explorer: ${explorerUrl}`));
  }
  console.log(colors.green(`Confirmed in block ${receipt.blockNumber}`));
  
  // The actual shares received would be in the transaction receipt events
  console.log(colors.green(`Buy shares transaction confirmed. Check events for shares received.`));
}

// CLI entry
async function main() {
  await runBuyShare();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runBuyShare };

