const { PrismaClient } = require("@prisma/client");
const { updateName } = require("./enum");
const prisma = new PrismaClient();
const { constructorData } = require("../consts");

async function main() {
  console.log("Seeding contracts...");

  const contracts = [
    {
      name: "Dispatcher",
      chain: "ARBITRUM",
      chainId: 42161,
      version: "v4",
      updateName: updateName.DISPATCHER_ADDRESS,
      order: 1,
    },
    {
      name: "UintListRegistry",
      chain: "ARBITRUM",
      chainId: 42161,
      version: "v4",
      order: 2,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: "0x0000000000000000000000000000000000000000",
          order: 1,
        },
      },
    },

    {
      name: "AddressListRegistry",
      chain: "ARBITRUM",
      chainId: 42161,
      version: "v4",
      order: 3,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: "0x0000000000000000000000000000000000000000",
          order: 1,
        },
      },
    },
    {
      name: "ExternalPositionFactory",
      chain: "ARBITRUM",
      chainId: 42161,
      version: "v4",
      order: 4,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: "0x0000000000000000000000000000000000000000",
          order: 1,
        },
      },
    },
    {
      name: "ExternalPositionFactory",
      chain: "ARBITRUM",
      chainId: 42161,
      version: "v4",
      updateName: updateName.GAS_RELAY_PAYMASTER_LIB_ADDRESS,
      order: 5,
      data: {
        wethToken: {
          value: constructorData.ARBITRUM.WETH,
          order: 1,
        },
        relayHub: {
          value: constructorData.ARBITRUM.ZERO_ADDRESS,
          order: 2,
        },
        trustedForwarder: {
          value: constructorData.ARBITRUM.ZERO_ADDRESS,
          order: 3,
        },
        depositCooldown: {
          value: 0,
          order: 4,
        },
        depositMaxTotal: {
          value: 0,
          order: 5,
        },
        relayFeeMaxBase: {
          value: 0,
          order: 6,
        },
        relayFeeMaxPercent: {
          value: 0,
          order: 7,
        },
      },
    },
  ];

  for (const contractData of contracts) {
    console.log(contractData);
    await prisma.contract.create({
      data: {
        name: contractData.name,
        updateName: contractData.updateName,
        chain: contractData.chain,
        chainId: contractData.chainId,
        version: contractData.version,
        order: contractData.order,
        data: contractData.data,
      },
    });
  }

  console.log("Contracts have been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
