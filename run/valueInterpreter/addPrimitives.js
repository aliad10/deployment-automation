const { callContract, resolveAddressFromDb, colors } = require("../core/runner");
require("dotenv").config();

// Minimal ABI for IValueInterpreter.addPrimitives(address[],address[],uint8[])
const VALUE_INTERPRETER_ABI = [
  "function addPrimitives(address[] primitives, address[] aggregators, uint8[] rateAssets) external",
];

// Static arrays copied from addPrimitives.s.sol
const PRIMITIVES = [
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  "0x853d955acef822db058eb8505911ed77f175b99e",
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x68749665FF8D2d112Fa859AA293F07A622782F38",
  "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
  "0x467719aD09025FcC6cF6F8311755809d45a5E5f3",
  "0x2dfF88A56767223A5529eA5960Da7A3F5f766406",
  "0x046EeE2cc3188071C02BfC1745A6b17c656e3f3d",
  "0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
  "0x85f138bfEE4ef8e540890CFb48F620571d67Eda3",
  "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1",
];

const AGGREGATORS = [
  "0x626E3d9c178B8fbB4753722E51126653FB657712",
  "0xd77255ae607111Fd6F019150cC1C0890F8dE32BA",
  "0x342952b4018d8a1823d64dc4d03667329619Ff76",
  "0x133404753c67E824AAa5e732C72BA44883F74243",
  "0xDa6e0E335c8f70e68462b5188fcdE81E91B81F9c",
  "0xfB3291314f4Eba31Cc9873e7683Bf6b0350a6102",
  "0xC2F4F19472f1586243d21D3F94a7BCe580440491",
  "0xf44d8bd78D0F7614cC4d9cc52bb97dCEFEb76232",
  "0x102B9C200f4181C99a57315577bD5EBE5774a7e8",
  "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7",
  "0x31697852a68433DbCc2Ff612c516d69E3D9bd08F",
];

const RATE_ASSETS = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

async function runAddPrimitives() {
  const resolvedValueInterpreter = await resolveAddressFromDb({ contractName: "ValueInterpreter" });

  if (!(PRIMITIVES.length === AGGREGATORS.length && AGGREGATORS.length === RATE_ASSETS.length)) {
    throw new Error("PRIMITIVES, AGGREGATORS, RATE_ASSETS must have the same length");
    }

  console.log(colors.cyan(`ValueInterpreter: ${resolvedValueInterpreter}`));
  console.log(colors.cyan(`Primitives: ${PRIMITIVES.length}, Aggregators: ${AGGREGATORS.length}, RateAssets: ${RATE_ASSETS.length}`));

  const { txHash, receipt, rpcUrl, staticResult, estimatedGas, simulation, explorerUrl, noOp } = await callContract({
    contractAddress: resolvedValueInterpreter,
    abi: VALUE_INTERPRETER_ABI,
    method: "addPrimitives",
    args: [PRIMITIVES, AGGREGATORS, RATE_ASSETS],
    noOpRevertMatchers: [/already.*primitive/i],
  });

  console.log(colors.cyan(`Using RPC: ${rpcUrl}`));
  if (simulation?.reverted) {
    console.log(colors.red(`Simulation reverted: ${simulation.reason || '<no reason provided>'}`));
    if (noOp) {
      console.log(colors.yellow("No-op: Some or all primitives already configured. Skipping transaction."));
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
  await runAddPrimitives();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runAddPrimitives };
