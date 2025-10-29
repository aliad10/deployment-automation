const { execSync } = require("child_process");

const getConstructorValues = (data) => {
  return Object.values(data)
    .sort((a, b) => a.order - b.order)
    .map((item) => item.value);
};

const getConstructorDataValue = (contractAddress) => {
  const contrctValue = contractAddress.split("0x")[1];

  return `0x19ab453c000000000000000000000000${contrctValue}`;
};

const deployViaFoundry = (contractName, contractPath, constructorArgs = []) => {
  const argsStr = constructorArgs.map((x) => `"${x}"`).join(" ");
  const cmd = `forge create --rpc-url ${process.env.RPC_URL} --private-key ${process.env.PRIVATE_KEY} ${contractPath}:${contractName} --constructor-args ${argsStr} --json`;

  try {
    const output = execSync(cmd, { encoding: "utf-8" });

    const deployedToMatch = output.match(/Deployed to:\s*(0x[a-fA-F0-9]{40})/);
    const txHashMatch = output.match(/Transaction hash:\s*(0x[a-fA-F0-9]{64})/);

    if (!deployedToMatch || !txHashMatch) {
      throw new Error(
        "Could not extract deployed address or transaction hash."
      );
    }

    const deployedTo = deployedToMatch[1];
    const transactionHash = txHashMatch[1];

    return { contractAddress: deployedTo, txHash: transactionHash };
  } catch (err) {
    console.error("Foundry deployment failed:", err.stdout || err.message);
    throw err;
  }
};

module.exports = {
  getConstructorDataValue,
  getConstructorValues,
  deployViaFoundry,
};
