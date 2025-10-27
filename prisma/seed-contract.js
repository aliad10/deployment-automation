const { seedArbitrumContracts } = require("./seed-contract-arbitrum");
const { seedEthContracts } = require("./seed-contract-mainnet");
async function main(chain) {
  if (chain === "ARBITRUM") {
    await seedArbitrumContracts();
  } else if (chain === "BASE") {
  } else if (chain === "POLYGON") {
  } else if (chain === "ETHEREUM") {
    await seedEthContracts();
  }

  console.log("Contracts have been seeded!");
}

main("ETHEREUM");
