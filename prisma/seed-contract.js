const { seedArbitrumContracts } = require("./seed-contract-arbitrum");
const { seedEthContracts } = require("./seed-contract-mainnet");
const { seedEthSepoliaContracts } = require("./seed-contract-sepolia");
async function main(chain) {
  if (chain === "ARBITRUM") {
    await seedArbitrumContracts();
  } else if (chain === "BASE") {
  } else if (chain === "POLYGON") {
  } else if (chain === "ETHEREUM") {
    await seedEthContracts();
  } else if (chain === "SEPOLIA") {
    await seedEthSepoliaContracts();
  }


  console.log("Contracts have been seeded!");
}

const argChain = (process.argv[2] || "ETHEREUM").toUpperCase();
main(argChain);
