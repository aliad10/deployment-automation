const { seedArbitrumContracts } = require("./seed-contract-arbitrum");

async function main(chain) {
  if (chain === "ARBITRUM") {
    await seedArbitrumContracts();
  } else if (chain === "BASE") {
  } else if (chain === "POLYGON") {
  } else if (chain === "ETHEREUM") {
  }

  console.log("Contracts have been seeded!");
}

main("ARBITRUM");
