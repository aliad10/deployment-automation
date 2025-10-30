const { ethers } = require("ethers");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

async function resolveRpcUrl() {
  // Priority:
  // 1) DEPLOYMENT_NAME -> lookup deployment.chain -> RPC_URL_<CHAIN>
  // 2) CHAIN env -> RPC_URL_<CHAIN>
  // 3) RPC_URL fallback
  const name = process.env.DEPLOYMENT_NAME;
  let chainFromDb;
  if (name) {
    const prisma = getPrisma();
    const deployment = await prisma.deployment.findUnique({ where: { name } });
    if (!deployment) throw new Error(`Deployment not found: ${name}`);
    chainFromDb = deployment.chain;
  }

  const chain = (chainFromDb || process.env.CHAIN || "SEPOLIA").toUpperCase();
  const key = `RPC_URL_${chain}`;
  const url = process.env[key] || process.env.RPC_URL;
  if (!url) throw new Error(`RPC URL not found. Set ${key} or RPC_URL in .env`);
  return url;
}

async function getWalletAndProvider(explicitRpcUrl) {
  const rpcUrl = explicitRpcUrl || (await resolveRpcUrl());
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error("PRIVATE_KEY is required in .env");
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  return { provider, wallet, rpcUrl };
}

function getContract(contractAddress, abi, signerOrProvider) {
  return new ethers.Contract(contractAddress, abi, signerOrProvider);
}

async function callContract({
  contractAddress,
  abi,
  method,
  args = [],
  rpcUrl,
  simulate = true,
  failOnRevert = false,
  noOpRevertMatchers = [], // array of RegExp or (reason: string) => boolean
}) {
  const { wallet, rpcUrl: usedRpc } = await getWalletAndProvider(rpcUrl);
  const contract = getContract(contractAddress, abi, wallet);
  if (!contract[method]) throw new Error(`Method not in ABI: ${method}`);
  const network = await wallet.provider.getNetwork();
  const chainId = Number(network.chainId);
  // simulate first using staticCall; throws on revert
  let staticResult;
  let simulation = { reverted: false, reason: undefined, data: undefined };
  if (simulate) {
    try {
      if (contract[method].staticCall) {
        staticResult = await contract[method].staticCall(...args);
      }
    } catch (e) {
      // Parse revert reason (ethers v6 error shape)
      const reason = e?.reason || e?.revert?.args?.[0] || e?.shortMessage || e?.message;
      const data = e?.data || e?.revert || undefined;
      simulation = { reverted: true, reason, data };
      if (failOnRevert) {
        const msg = reason ? `${reason}` : `${e}`;
        throw new Error(`Static simulation failed for ${method}: ${msg}`);
      }
    }
  }

  // Optional gas estimation (does not send)
  let estimatedGas;
  if (!simulation.reverted) {
    try {
      if (contract[method].estimateGas) {
        estimatedGas = await contract[method].estimateGas(...args);
      }
    } catch (_) {
      // best-effort; ignore estimation failures
    }
  }

  // If simulation reverted and we're not failing, return without sending
  if (simulation.reverted) {
    const reasonLower = (simulation.reason || '').toLowerCase();
    const matched = Array.isArray(noOpRevertMatchers) && noOpRevertMatchers.some((m) => {
      if (!m) return false;
      if (m instanceof RegExp) return m.test(reasonLower);
      if (typeof m === 'function') {
        try { return !!m(reasonLower); } catch { return false; }
      }
      return false;
    });
    return { rpcUrl: usedRpc, staticResult, estimatedGas, simulation, chainId, noOp: matched };
  }

  const tx = await contract[method](...args);
  const receipt = await tx.wait();
  const explorerBase = getExplorerBase(chainId);
  const explorerUrl = explorerBase ? `${explorerBase}/tx/${tx.hash}` : undefined;
  return { txHash: tx.hash, receipt, rpcUrl: usedRpc, staticResult, estimatedGas, simulation, chainId, explorerUrl };
}

function getExplorerBase(chainId) {
  switch (Number(chainId)) {
    case 1:
      return "https://etherscan.io";
    case 11155111:
      return "https://sepolia.etherscan.io";
    case 42161:
      return "https://arbiscan.io";
    default:
      return undefined;
  }
}

// Simple ANSI color helpers (no external deps)
const colors = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

module.exports = {
  resolveRpcUrl,
  getWalletAndProvider,
  getContract,
  callContract,
  resolveAddressFromDb,
  colors,
};

// Lazy prisma instance to avoid cost when DB isn't needed
let prisma;
function getPrisma() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

async function resolveAddressFromDb({ contractName, deploymentName }) {
  if (!contractName) throw new Error("contractName is required to resolve from DB");
  const prisma = getPrisma();

  let deployment;
  const name = deploymentName || process.env.DEPLOYMENT_NAME;
  if (name) {
    deployment = await prisma.deployment.findUnique({ where: { name } });
    if (!deployment) throw new Error(`Deployment not found: ${name}`);
  } else {
    // Fallback: use the most recent deployment
    deployment = await prisma.deployment.findFirst({ orderBy: { createdAt: "desc" } });
    if (!deployment) throw new Error("No deployments found in DB. Set DEPLOYMENT_NAME.");
  }

  const deployed = await prisma.deployedContract.findFirst({
    where: {
      deploymentId: deployment.id,
      contractName,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!deployed) {
    throw new Error(`Deployed address not found for ${contractName} under deployment ${deployment.name}`);
  }

  return deployed.address;
}


