const { PrismaClient } = require("@prisma/client");
const { updateName, constructorDataUpdateName } = require("./enum");
const prisma = new PrismaClient();
const { constructorData } = require("../consts");

const seedEthContracts = async () => {
  console.log("Seeding contracts...");
  const contracts = [
    {
      name: "Dispatcher",
      version: "dev",
      updateName: [updateName.DISPATCHER_ADDRESS],
      constructorDataUpdateName: constructorDataUpdateName.DISPATCHER,
      order: 1,
    },
    {
      name: "UintListRegistry",
      version: "dev",
      updateName: [updateName.UINT_LIST_REGISTRY_ADDRESS],
      order: 2,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },

    {
      name: "AddressListRegistry",
      version: "dev",
      order: 3,
      updateName: [updateName.ADDRESS_LIST_REGISTRY_ADDRESS],
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "ExternalPositionFactory",
      version: "dev",
      updateName: [updateName.EXTERNAL_POSITION_FACTORY_ADDRESS],
      order: 4,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "GasRelayPaymasterLib",
      version: "dev",
      updateName: [updateName.GAS_RELAY_PAYMASTER_LIB_ADDRESS],
      order: 5,
      data: {
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 1,
        },
        relayHub: {
          value: constructorData.ETHEREUM.RELAY_HUB,
          order: 2,
        },
        trustedForwarder: {
          value: constructorData.ETHEREUM.TRUSTED_FORWARDER,
          order: 3,
        },
        depositCooldown: {
          value: 86400,
          order: 4,
        },
        depositMaxTotal: {
          value: 1000000000000000000,
          order: 5,
        },
        relayFeeMaxBase: {
          value: 0,
          order: 6,
        },
        relayFeeMaxPercent: {
          value: 10,
          order: 7,
        },
      },
    },

    {
      name: "GasRelayPaymasterFactory",
      version: "dev",
      updateName: [updateName.GAS_RELAY_PAYMASTER_FACTORY_ADDRESS],
      order: 6,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.GAS_RELAY_PAYMASTER_LIB_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "FundDeployer",
      version: "dev",
      updateName: [updateName.FUND_DEPLOYER_ADDRESS],
      order: 7,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.GAS_RELAY_PAYMASTER_FACTORY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },

    {
      name: "FeeManager",
      version: "dev",
      updateName: [updateName.FEE_MANAGER_ADDRESS],
      order: 8,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "PolicyManager",
      version: "dev",
      updateName: [updateName.POLICY_MANAGER_ADDRESS],
      order: 9,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.GAS_RELAY_PAYMASTER_FACTORY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "ValueInterpreter",
      version: "dev",
      updateName: [updateName.VALUE_INTERPRETER_ADDRESS],
      order: 10,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
        chainlinkStaleRateThreshold: {
          value: 90000,
          order: 3,
        },
      },
    },
    {
      name: "IntegrationManager",
      version: "dev",
      order: 11,
      updateName: [updateName.INTEGRATION_MANAGER_ADDRESS],
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },
    {
      name: "ExternalPositionManager",
      version: "dev",
      order: 12,
      updateName: [updateName.EXTERNAL_POSITION_MANAGER_ADDRESS],
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.EXTERNAL_POSITION_FACTORY_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },
    {
      name: "ProtocolFeeTracker",
      version: "dev",
      updateName: [updateName.PROTOCOL_FEE_TRACKER_ADDRESS],
      order: 13,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "GlobalConfigLib",
      version: "dev",
      updateName: [updateName.GLOBAL_CONFIG_LIB_ADDRESS],
      order: 14,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "GlobalConfigProxy",
      version: "dev",
      order: 15,
      updateName: [updateName.GLOBAL_CONFIG_PROXY_ADDRESS],
      data: {
        [constructorDataUpdateName.DISPATCHER]: {
          // @ts-check: handle this
          value: null, //  fill this with zero value
          order: 1,
        },
        [updateName.GLOBAL_CONFIG_LIB_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "FundValueCalculator",
      version: "dev",
      updateName: [updateName.FUND_VALUE_CALCULATOR_ADDRESS],
      order: 16,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.PROTOCOL_FEE_TRACKER_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },
    {
      name: "FundValueCalculatorRouter",
      version: "dev",
      updateName: [updateName.FUND_VALUE_CALCULATOR_ROUTER_ADDRESS],

      order: 17,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          // @ts-check: handle this

          value: null,
          order: 2,
          type: "array",
        },
        [updateName.FUND_VALUE_CALCULATOR_ADDRESS]: {
          // @ts-check: handle this
          value: null,
          order: 3,
          type: "array",
        },
      },
    },
    {
      name: "AaveV3ATokenListOwner",
      version: "dev",
      order: 18,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        listDescription: {
          value: "Aave v3: aTokens",
          order: 2,
        },
        poolAddressProvider: {
          value: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
          order: 3,
        },
      },
    },
    {
      name: "UnpermissionedActionsWrapper",
      version: "dev",
      order: 19,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "BalancerV2GaugeTokenPriceFeed",
      version: "dev",
      order: 20,
    },
    {
      name: "BalancerV2StablePoolPriceFeed",
      version: "dev",
      order: 21,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        balancerVault: {
          value: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
          order: 2,
        },
        poolFactories: {
          value: [
            "0x67d27634E44793fE63c467035E31ea8635117cd4",
            "0xdba127fBc23fb20F5929C546af220A991b5C6e01",
          ],
          order: 3,
        },
      },
    },
    {
      name: "AaveV3FlashLoanAssetManagerLib",
      version: "dev",
      order: 22,
      updateName: [updateName.AAVE_V3_FLASH_LOAN_ASSET_MANAGER_LIB_ADDRESS],
      data: {
        aavePoolAddressProviderAddress: {
          value: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
          order: 1,
        },
        aaveReferralCode: {
          value: 0,
          order: 2,
        },
      },
    },
    {
      name: "ProtocolFeeReserveLib",
      version: "dev",
      updateName: [updateName.PROTOCOL_FEE_RESERVE_LIB_ADDRESS],
      order: 23,
    },
    {
      name: "ProtocolFeeReserveProxy",
      version: "dev",
      updateName: [
        updateName.PROTOCOL_FEE_RESERVE_PROXY_ADDRESS,
        updateName.PROTOCOL_FEE_RESERVE_PROXY_ADDRESS_2,
      ],
      order: 24,
      data: {
        [constructorDataUpdateName.DISPATCHER]: {
          // @ts-check: handle this
          value: null,
          order: 1,
        },
        [updateName.PROTOCOL_FEE_RESERVE_LIB_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "VaultLib",
      version: "dev",
      order: 25,
      data: {
        [updateName.EXTERNAL_POSITION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.GAS_RELAY_PAYMASTER_FACTORY_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.PROTOCOL_FEE_RESERVE_PROXY_ADDRESS]: {
          value: null,
          order: 3,
        },
        [updateName.PROTOCOL_FEE_TRACKER_ADDRESS]: {
          value: null,
          order: 4,
        },
        mlnToken: {
          value: constructorData.ETHEREUM.MLN_TOKEN,
          order: 5,
        },
        mlnBurner: {
          value: constructorData.ETHEREUM.ZERO_ADDRESS,
          order: 6,
        },
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 7,
        },
        positionsLimit: {
          value: 20,
          order: 8,
        },
      },
    },
    {
      name: "EntranceRateBurnFee",
      version: "dev",
      order: 26,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "ExitRateDirectFee",
      version: "dev",
      order: 27,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "AllowedExternalPositionTypesPolicy",
      version: "dev",
      order: 28,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    ///
    {
      name: "NoDepegOnRedeemSharesForSpecificAssetsPolicy",
      version: "dev",
      order: 29,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "MinSharesSupplyFee",
      version: "dev",
      order: 30,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "AllowedAdaptersPolicy",
      version: "dev",
      order: 31,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "EntranceRateDirectFee",
      version: "dev",
      order: 32,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },

    {
      name: "AllowedAdapterIncomingAssetsPolicy",
      version: "dev",
      order: 33,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "ManagementFee",
      version: "dev",
      order: 34,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "AllowedAdaptersPerManagerPolicy",
      version: "dev",
      order: 35,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "AllowedAssetsForRedemptionPolicy",
      version: "dev",
      order: 36,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "MinMaxInvestmentPolicy",
      version: "dev",
      order: 37,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "ExitRateBurnFee",
      version: "dev",
      order: 38,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "PerformanceFee",
      version: "dev",
      order: 39,
      data: {
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "AllowedSharesTransferRecipientsPolicy",
      version: "dev",
      order: 40,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "AllowedDepositRecipientsPolicy",
      version: "dev",
      order: 41,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "AllowedExternalPositionTypesPerManagerPolicy",
      version: "dev",
      order: 42,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.UINT_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "DisallowedAdapterIncomingAssetsPolicy",
      version: "dev",
      order: 43,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "MinAssetBalancesPostRedemptionPolicy",
      version: "dev",
      order: 44,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "AllowedRedeemersForSpecificAssetsPolicy",
      version: "dev",
      order: 45,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "OnlyUntrackDustOrPricelessAssetsPolicy",
      version: "dev",
      order: 46,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 3,
        },
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 4,
        },
        pricelessAssetBypassTimelock: {
          value: 604800,
          order: 5,
        },
        pricelessAssetBypassTimeLimit: {
          value: 172800,
          order: 6,
        },
      },
    },
    {
      name: "CumulativeSlippageTolerancePolicy",
      version: "dev",
      order: 47,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 3,
        },
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 4,
        },
        bypassableAdaptersListId: {
          value: 1,
          order: 5,
        },
        tolerancePeriodDuration: {
          value: 604800,
          order: 6,
        },
        pricelessAssetBypassTimelock: {
          value: 604800,
          order: 7,
        },
        pricelessAssetBypassTimeLimit: {
          value: 172800,
          order: 8,
        },
      },
    },
    {
      name: "OnlyRemoveDustExternalPositionPolicy",
      version: "dev",
      order: 48,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 3,
        },
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 4,
        },
        pricelessAssetBypassTimelock: {
          value: 604800,
          order: 5,
        },
        pricelessAssetBypassTimeLimit: {
          value: 172800,
          order: 6,
        },
      },
    },
    {
      name: "UniswapV3LiquidityPositionLib",
      version: "dev",
      order: 49,
      data: {
        nonFungibleTokenManagerAddress: {
          value: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
          order: 1,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "OneInchV5Adapter",
      version: "dev",
      order: 50,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        oneInchV5ExchangeAddress: {
          value: "0x1111111254EEB25477B68fb85Ed929f73A960582",
          order: 2,
        },
      },
    },
    // {
    //   name: "AaveV3DebtPositionParser",
    //   version: "dev",
    //   order: 500000000000000000,
    //   data: {
    //     [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
    //       value: null,
    //       order: 1,
    //     },
    //     aTokenListId: {
    //       value: 463, //todo: mahdi
    //       order: 2,
    //     },
    //   },
    // },
    {
      name: "BalancerV2LiquidityAdapter",
      version: "dev",
      order: 51,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        balancerVaultAddress: {
          value: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
          order: 2,
        },
        balancerMinterAddress: {
          value: "0x239e55F427D44C3cc793f49bFB507ebe76638a2b",
          order: 3,
        },
        balTokenAddress: {
          value: "0xba100000625a3754423978a60c9317c58a424e3D",
          order: 4,
        },
      },
    },
    {
      name: "UniswapV3LiquidityPositionParser",
      version: "dev",
      order: 52,
      data: {
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 1,
        },
        nonfungiblePositionManagerAddress: {
          value: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
          order: 2,
        },
      },
    },
    {
      name: "UniswapV3Adapter",
      version: "dev",
      order: 53,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        routerAddress: {
          value: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
          order: 2,
        },
      },
    },
    {
      name: "AaveV3DebtPositionLib",
      version: "dev",
      order: 54,
      data: {
        dataProviderAddress: {
          //ts-check IAaveV3ProtocolDataProvider interface
          value: "0x41393e5e337606dc3821075Af65AeE84D7688CBD",
          order: 1,
        },
        lendingPoolAddressProviderAddress: {
          //ts-check IAaveV3PoolAddressProvider interface
          value: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
          order: 2,
        },
        merklDistributor: {
          value: "0x3Ef3D8bA38EBe18DB133cEc108f4D14CE00Dd9Ae",
          order: 3,
        },
        referralCode: {
          value: 0,
          order: 4,
        },
        rewardsControllerAddress: {
          //ts-check IAaveV3RewardsController interface
          value: "0x8164Cc65827dcFe994AB23944CBC90e0aa80bFcb",
          order: 5,
        },
      },
    },
    {
      name: "ParaSwapV5Adapter",
      version: "dev",
      order: 55,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        augustusSwapperAddress: {
          value: "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57",
          order: 2,
        },
        tokenTransferProxyAddress: {
          value: "0x216B4B4Ba9F3e719726886d34a177484278Bfcae",
          order: 3,
        },
        feePartnerAddress: {
          value: "0x0000000000000000000000000000000000000000",
          order: 4,
        },
        feePercent: {
          value: 0,
          order: 5,
        },
      },
    },
    // {
    //   name: "GMXV2LeverageTradingPositionParser",
    //   version: "dev",
    //   order: 56,
    //   data: {
    //     wrappedNativeTokenAddress: {
    //       value: constructorData.ARBITRUM.WETH,
    //       order: 1,
    //     },
    //     dataStoreAddress: {
    //       value: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
    //       order: 2,
    //     },
    //     readerAddress: {
    //       //ts-check IGMXV2Reader interface
    //       value: "0x5Ca84c34a381434786738735265b9f3FD814b824",
    //       order: 3,
    //     },
    //   },
    // }, //not exist on eth
    {
      name: "ManualValueOracleLib",
      version: "dev",
      order: 57,
    },
    {
      name: "ManualValueOracleFactory",
      version: "dev",
      order: 58,
    },
    {
      name: "TheGraphDelegationPositionParser",
      version: "dev",
      order: 59,
      data: {
        grtTokenAddress: {
          value: constructorData.ETHEREUM.GRT_TOKEN,
          order: 1,
        },
      },
    },
    {
      name: "TheGraphDelegationPositionLib",
      version: "dev",
      order: 60,
      data: {
        stakingProxyAddress: {
          value: "0xF55041E37E12cD407ad00CE2910B8269B01263b9",
          order: 1,
        },
        grtTokenAddress: {
          value: constructorData.ETHEREUM.GRT_TOKEN,
          order: 2,
        },
      },
    },
    {
      name: "TransferAssetsAdapter",
      version: "dev",
      order: 61,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "DispatcherOwnedBeaconFactory",
      version: "dev",
      order: 62,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.AAVE_V3_FLASH_LOAN_ASSET_MANAGER_LIB_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "DepositWrapper",
      version: "dev",
      order: 63,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        allowedExchangesListId: {
          value: 553,
          order: 2,
        },
        wrappedNativeAssetAddress: {
          //ts-check IWETH interface
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },

    // {
    //   name: "GMXV2LeverageTradingPositionLib",
    //   version: "dev",
    //   order: 64,
    //   data: {
    //     wrappedNativeTokenAddress: {
    //       //ts-check IWETH interface
    //       value: constructorData.ARBITRUM.WETH,
    //       order: 1,
    //     },
    //     dataStoreAddress: {
    //       //ts-check IGMXV2DataStore interface
    //       value: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
    //       order: 2,
    //     },
    //     chainlinkPriceFeedProviderAddress: {
    //       //ts-check IGMXV2ChainlinkPriceFeedProvider interface
    //       value: "0x527FB0bCfF63C47761039bB386cFE181A92a4701",
    //       order: 3,
    //     },
    //     readerAddress: {
    //       //ts-check IGMXV2Reader interface
    //       value: "0x5Ca84c34a381434786738735265b9f3FD814b824",
    //       order: 4,
    //     },
    //     roleStoreAddress: {
    //       //ts-check IGMXV2RoleStore interface
    //       value: "0x3c3d99FD298f679DBC2CEcd132b4eC4d0F5e6e72",
    //       order: 5,
    //     },
    //     callbackGasLimit: {
    //       value: 750000,
    //       order: 6,
    //     },
    //     referralCode: {
    //       value: constructorData.ARBITRUM.ZERO_BYTES32,
    //       order: 7,
    //     },
    //     referralStorageAddress: {
    //       value: "0xe6fab3F0c7199b0d34d7FbE83394fc0e0D06e99d",
    //       order: 8,
    //     },
    //     uiFeeReceiverAddress: {
    //       value: "0xaE87F9BD09895f1aA21c5023b61EcD85Eba515D1",
    //       order: 9,
    //     },
    //   },
    // }, // not exist
    {
      name: "ComptrollerLib",
      version: "dev",
      order: 65,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.PROTOCOL_FEE_RESERVE_PROXY_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 3,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 4,
        },
        [updateName.EXTERNAL_POSITION_MANAGER_ADDRESS]: {
          value: null,
          order: 5,
        },
        [updateName.FEE_MANAGER_ADDRESS]: {
          value: null,
          order: 6,
        },
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 7,
        },
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 8,
        },
        [updateName.GAS_RELAY_PAYMASTER_FACTORY_ADDRESS]: {
          value: null,
          order: 9,
        },
        mlnTokenAddress: {
          value: constructorData.ETHEREUM.MLN_TOKEN,
          order: 10,
        },
        wrappedNativeTokenAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 11,
        },
      },
    },
    {
      name: "BalancerV2WeightedPoolPriceFeed",
      version: "dev",
      order: 66,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 2,
        },
        intermediaryAssetAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
        balancerVaultAddress: {
          value: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
          order: 4,
        },
        poolFactories: {
          value: [],
          order: 5,
        },
      },
    },
    {
      name: "AaveV3Adapter",
      version: "dev",
      order: 67,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
        aTokenListId: {
          value: 463, //@todo: mahdi
          order: 3,
        },
        pool: {
          value: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
          order: 4,
        },
        referralCode: {
          value: 0,
          order: 5,
        },
      },
    },
    {
      name: "ParaSwapV6Adapter",
      version: "dev",
      order: 68,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        augustusSwapper: {
          value: "0x6A000F20005980200259B80c5102003040001068",
          order: 2,
        },
      },
    },
    {
      name: "AaveDebtPositionLib",
      version: "dev",
      order: 70,
      data: {
        aaveDataProvider: {
          value: "0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d",
          order: 1,
        },
        aaveLendingPoolAddressProvider: {
          value: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
          order: 2,
        },
        aaveIncentivesController: {
          value: "0xd784927Ff2f95ba542BfC824c8a8a98F3495f6b5",
          order: 3,
        },
      },
    },
    {
      name: "AaveDebtPositionParser",
      version: "dev",
      order: 71,
      data: {
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "AaveV2Adapter",
      version: "dev",
      order: 72,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 2,
        },
        aTokenListId: {
          value: 462, //@todo: mahdi
          order: 3,
        },
        lendingPool: {
          value: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
          order: 4,
        },
      },
    },
    {
      name: "AaveV2ATokenListOwner",
      version: "dev",
      order: 73,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        listDescription: {
          value: "Aave v2: aTokens",
          order: 2,
        },
        poolAddressProvider: {
          value: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
          order: 3,
        },
      },
    },
    {
      name: "AlicePositionLib",
      version: "dev",
      order: 74,
      data: {
        aliceOrderManagerAddress: {
          value: "0x841473a19279E54a850E9083A3A57dE9e6244d2E",
          order: 1,
        },
        wrappedNativeAssetAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
      },
    },
    {
      name: "AlicePositionParser",
      version: "dev",
      order: 75,
      data: {
        aliceOrderManagerAddress: {
          value: "0x841473a19279E54a850E9083A3A57dE9e6244d2E",
          order: 1,
        },
        wrappedNativeAssetAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
      },
    },
    {
      name: "ArbitraryLoanPositionLib",
      version: "dev",
      order: 76,
      data: {
        wrappedNativeAsset: {
          value: constructorData.ETHEREUM.WETH,
          order: 1,
        },
      },
    },
    {
      name: "ArbitraryLoanPositionParser",
      version: "dev",
      order: 77,
    },
    {
      name: "ArbitraryLoanTotalNominalDeltaOracleModule",
      version: "dev",
      order: 78,
    },

    {
      name: "AssetValueCalculator",
      version: "dev",
      order: 79,
      data: {
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "ChainlinkLikeWstethPriceFeed",
      version: "dev",
      updateName: [updateName.CHAIN_LINK_LIKE_WSTETH_PRICE_FEED_ADDRESS],
      order: 80,
      data: {
        steth: {
          value: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
          order: 1,
        },
        stethEthChainlinkAggregator: {
          value: "0x86392dC19c0b719886221c78AB11eb8Cf5c52812",
          order: 2,
        },
      },
    },
    {
      name: "ChainlinkLikeYnEthPriceFeed",
      version: "dev",
      order: 81,
      data: {
        curveYnethWstethPool: {
          value: "0x19B8524665aBAC613D82eCE5D8347BA44C714bDd",
          order: 1,
        },
        [updateName.CHAIN_LINK_LIKE_WSTETH_PRICE_FEED_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "CompoundPriceFeed",
      version: "dev",
      updateName: [updateName.COMPOUND_PRICE_FEED_ADDRESS],
      order: 82,

      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        weth: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },

        ceth: {
          value: "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5",
          order: 3,
        },
      },
    },
    {
      name: "CompoundDebtPositionLib",
      version: "dev",
      order: 83,
      data: {
        compoundComptroller: {
          value: "0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B",
          order: 1,
        },
        compToken: {
          value: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
          order: 2,
        },

        weth: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },
    {
      name: "CompoundDebtPositionParser",
      version: "dev",
      order: 84,
      data: {
        [updateName.COMPOUND_PRICE_FEED_ADDRESS]: {
          value: null,
          order: 1,
        },
        compToken: {
          value: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
          order: 2,
        },

        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },

    {
      name: "CompoundAdapter",
      version: "dev",
      order: 84,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.COMPOUND_PRICE_FEED_ADDRESS]: {
          value: null,
          order: 2,
        },

        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },
    {
      name: "CompoundV3Adapter",
      version: "dev",
      order: 85,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        compoundV3Configurator: {
          value: "0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3",
          order: 2,
        },
        compoundV3Rewards: {
          value: "0x1B0e765F6224C21223AeA2af16c1C46E38885a40",
          order: 2,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 3,
        },
        cTokenListId: {
          value: 436, //todo: mahdi
          order: 2,
        },
      },
    },
    {
      name: "CompoundV3CTokenListOwner",
      version: "dev",
      order: 86,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        listDescription: {
          value: "Compound v3: cTokens",
          order: 2,
        },

        compoundV3Configurator: {
          value: "0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3",
          order: 3,
        },
      },
    },
    {
      name: "ConvertedQuoteAggregatorFactory",
      version: "dev",
      order: 87,
    },
    {
      name: "ConvexVotingPositionLib",
      version: "dev",
      order: 88,
      data: {
        vlCvx: {
          value: "0x72a19342e8F1838460eBFCCEf09F6585e32db86E",
          order: 1,
        },
        vlCvxExtraRewards: {
          value: "0x9B622f2c40b80EF5efb14c2B2239511FfBFaB702",
          order: 2,
        },

        cvxCrvStaking: {
          value: "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e",
          order: 3,
        },
        cvxToken: {
          value: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",
          order: 4,
        },
        snapshotDelegateRegistry: {
          value: "0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446",
          order: 5,
        },
        votiumMultiMerkleStash: {
          value: "0x378Ba9B73309bE80BF4C2c027aAD799766a7ED5A",
          order: 6,
        },
      },
    },
    {
      name: "ConvexVotingPositionParser",
      version: "dev",
      order: 89,
      data: {
        cvxToken: {
          value: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",
          order: 1,
        },
      },
    },
    {
      name: "EnzymeVaultPriceFeed",
      version: "dev",
      order: 90,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },

        [updateName.FUND_VALUE_CALCULATOR_ROUTER_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "EnzymeV4VaultAdapter",
      version: "dev",
      order: 90,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 2,
        },
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },
    {
      name: "ERC4626Adapter",
      version: "dev",
      order: 91,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "ERC4626PriceFeed",
      version: "dev",
      order: 92,
    },
    {
      name: "ERC4626RateAggregatorFactory",
      version: "dev",
      order: 93,
    },
    {
      name: "EtherFiEthPriceFeed",
      version: "dev",
      order: 94,
      data: {
        eeth: {
          value: "0x35fA164735182de50811E8e2E824cFb9B6118ac2",
          order: 1,
        },
        weeth: {
          value: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
          order: 2,
        },
      },
    },
    {
      name: "FundDataProviderRouter",
      version: "dev",
      order: 95,
      data: {
        [updateName.FUND_VALUE_CALCULATOR_ROUTER_ADDRESS]: {
          value: null,
          order: 1,
        },
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
      },
    },
    {
      name: "GatedRedemptionQueueSharesWrapperLib",
      version: "dev",
      order: 96,
      data: {
        [updateName.GLOBAL_CONFIG_PROXY_ADDRESS]: {
          value: null,
          order: 1,
        },
        wrappedNativeAsset: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
      },
    },
    {
      name: "GatedRedemptionQueueSharesWrapperFactory",
      version: "dev",
      updateName: [
        updateName.GATED_REDEMPTION_QUEUE_SHARES_WRAPPER_LIB_ADDRESS,
      ],

      order: 97,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.GATED_REDEMPTION_QUEUE_SHARES_WRAPPER_LIB_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "KilnStakingPositionLib",
      version: "dev",
      order: 98,
      data: {
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 1,
        },
        exitedValidatorEthThreshold: {
          value: 20000000000000000000,
          order: 2,
        },
      },
    },
    {
      name: "KilnStakingPositionParser",
      version: "dev",
      order: 99,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        stakingContractsListId: {
          value: 400, //todo: mahdi
          order: 2,
        },
        weth: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },
    {
      name: "LidoWithdrawalsPositionLib",
      version: "dev",
      order: 100,
      data: {
        withdrawalQueue: {
          value: "0x889edC2eDab5f40e902b864aD4d7AdE8E412F9B1",
          order: 1,
        },
        stethAddress: {
          value: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
          order: 2,
        },
      },
    },
    {
      name: "LidoWithdrawalsPositionParser",
      version: "dev",
      order: 101,
      data: {
        stethAddress: {
          value: "0x889edC2eDab5f40e902b864aD4d7AdE8E412F9B1",
          order: 1,
        },
        wethAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
      },
    },
    {
      name: "MapleLiquidityPositionLib",
      version: "dev",
      order: 102,
    },
    {
      name: "MapleLiquidityPositionParser",
      version: "dev",
      order: 103,
      data: {
        mapleV2Globals: {
          value: "0x804a6F5F667170F545Bf14e5DDB48C70B788390C",
          order: 1,
        },
      },
    },
    {
      name: "MorphoBluePositionLib",
      version: "dev",
      order: 104,
      data: {
        allowedMorphoBlueVaultsListId: {
          value: 3,
          order: 1,
        },
        morphoBlueAddress: {
          value: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
          order: 2,
        },
        [updateName.UINT_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },

    {
      name: "MorphoBluePositionParser",
      version: "dev",
      order: 105,
      data: {
        morphoBlueAddress: {
          value: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
          order: 1,
        },
      },
    },
    {
      name: "PeggedDerivativesPriceFeed",
      version: "dev",
      order: 106,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "PeggedRateDeviationAggregatorFactory",
      version: "dev",
      order: 107,
    },
    {
      name: "PendleV2Adapter",
      version: "dev",
      order: 108,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        pendleRouterAddress: {
          value: "0x888888888889758F76e7103c6CbF23ABbF58F946",
          order: 2,
        },
        wrappedNativeAssetAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },
    {
      name: "SharePriceThrottledAssetManagerLib",
      version: "dev",
      updateName: [updateName.SHARE_PRICE_THROTTLED_ASSET_MANAGER_LIB_ADDRESS],
      order: 109,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        pendleRouterAddress: {
          value: 598,
          order: 2,
        },
        [updateName.FUND_VALUE_CALCULATOR_ROUTER_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },
    {
      name: "SharePriceThrottledAssetManagerFactory",
      version: "dev",
      order: 110,
      data: {
        [updateName.SHARE_PRICE_THROTTLED_ASSET_MANAGER_LIB_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },

    {
      name: "SharesSplitterFactory",
      version: "dev",
      order: 111,
      data: {
        [updateName.GLOBAL_CONFIG_PROXY_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "SingleAssetDepositQueueLib",
      version: "dev",
      updateName: [updateName.SINGLE_ASSET_DEPOSIT_QUEUE_LIB_ADDRESS],
      order: 112,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.GLOBAL_CONFIG_PROXY_ADDRESS]: {
          value: null,
          order: 2,
        },

        gsnTrustedForwardersAddressListId: {
          value: 598, //todo: mahdi
          order: 3,
        },
      },
    },
    {
      name: "SingleAssetRedemptionQueueLib",
      version: "dev",
      updateName: [updateName.SINGLE_ASSET_REDEMPTION_QUEUE_LIB_ADDRESS],
      order: 113,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },

        gsnTrustedForwardersAddressListId: {
          value: 598, //todo: mahdi
          order: 2,
        },
        [updateName.GLOBAL_CONFIG_PROXY_ADDRESS]: {
          value: null,
          order: 3,
        },
      },
    },
    {
      name: "SingleAssetRedemptionQueueFactory",
      version: "dev",
      order: 114,
      data: {
        [updateName.SINGLE_ASSET_REDEMPTION_QUEUE_LIB_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },

    {
      name: "SolvBtcYieldTokenRateUsdAggregatorFactory",
      version: "dev",
      order: 116,
    },
    {
      name: "StaderSDPriceFeed",
      version: "dev",
      order: 117,
      data: {
        sdTokenAddress: {
          value: "0x30D20208d987713f46DFD34EF128Bb16C404D10f",
          order: 1,
        },
        staderOracleAddress: {
          value: "0xF64bAe65f6f2a5277571143A24FaaFDFC0C2a737",
          order: 2,
        },
        wethAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },
    {
      name: "StaderStakingAdapter",
      version: "dev",
      order: 118,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        staderStakePoolsManagerAddress: {
          value: "0xcf5EA1b38380f6aF39068375516Daf40Ed70D299",
          order: 2,
        },

        ethxAddress: {
          value: "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b",
          order: 3,
        },
        wethAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 4,
        },
      },
    },
    {
      name: "StaderWithdrawalsPositionLib",
      version: "dev",
      order: 119,
      data: {
        _userWithdrawalManagerAddress: {
          value: "0x9F0491B32DBce587c50c4C43AB303b06478193A7",
          order: 1,
        },

        ethxAddress: {
          value: "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b",
          order: 2,
        },
        wethAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },
    {
      name: "StaderWithdrawalsPositionParser",
      version: "dev",
      order: 120,
      data: {
        ethxAddress: {
          value: "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b",
          order: 1,
        },
        wethAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
      },
    },
    {
      name: "StakeWiseV3StakingPositionLib",
      version: "dev",
      order: 121,
      data: {
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 1,
        },
        _referrer: {
          value: constructorData.ETHEREUM.ZERO_ADDRESS,
          order: 2,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 3,
        },
        supportedImplementationsListID: {
          value: 856,
          order: 4,
        },
      },
    },

    {
      name: "StakeWiseV3StakingPositionParser",
      version: "dev",
      order: 122,
      data: {
        stakeWiseV3VaultsRegistryAddress: {
          value: "0x3a0008a588772446f6e656133C2D5029CC4FC20E",
          order: 1,
        },
        wethToken: {
          value: constructorData.ETHEREUM.WETH,
          order: 2,
        },
      },
    },
    {
      name: "SwellStakingAdapter",
      version: "dev",
      order: 123,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        swethAddress: {
          value: "0xf951E335afb289353dc249e82926178EaC7DEd78",
          order: 2,
        },
        wethAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
        referralAddress: {
          value: "0x1ad1fc9964c551f456238Dd88D6a38344B5319D7",
          order: 4,
        },
      },
    },

    {
      name: "TermFinanceV1LendingPositionLib",
      version: "dev",
      order: 124,
      data: {
        referrerAddress: {
          value: "0x1ad1fc9964c551f456238Dd88D6a38344B5319D7",
          order: 1,
        },
      },
    },
    {
      name: "TermFinanceV1LendingPositionParser",
      version: "dev",
      order: 125,
      data: {
        termControllerAddress: {
          value: "0x62f476DBB9B60D9272e26994525F4Db80Fd543e4",
          order: 1,
        },
      },
    },

    {
      name: "UniswapV2ExchangeAdapter",
      version: "dev",
      order: 126,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        router: {
          value: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
          order: 2,
        },
      },
    },
    {
      name: "UniswapV2PoolPriceFeed",
      version: "dev",
      order: 127,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          value: null,
          order: 2,
        },
        factory: {
          value: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
          order: 3,
        },
      },
    },
    {
      name: "UsdEthSimulatedAggregator",
      version: "dev",
      order: 128,
      data: {
        ethUsdAggregator: {
          value: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
          order: 1,
        },
      },
    },
    {
      name: "YearnVaultV2PriceFeed",
      version: "dev",
      updateName: [updateName.YEARN_VAULT_V2_PRICE_FEED_ADDRESS],
      order: 129,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        yearnVaultV2Registry: {
          value: "0x50c1a2eA0a861A967D9d0FFE2AE4012c2E053804",
          order: 2,
        },
      },
    },
    {
      name: "YearnVaultV2Adapter",
      version: "dev",
      order: 130,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.YEARN_VAULT_V2_PRICE_FEED_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },

    {
      name: "ZeroExV4Adapter",
      version: "dev",
      order: 131,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        exchange: {
          value: "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
          order: 2,
        },
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 3,
        },
        allowedMakersListId: {
          value: 0,
          order: 4,
        },
      },
    },
    {
      name: "AaveV3FlashLoanAssetManagerFactory",
      version: "dev",
      order: 132,
      path: "DispatcherOwnedBeaconFactory",
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },

        [updateName.AAVE_V3_FLASH_LOAN_ASSET_MANAGER_LIB_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "SingleAssetDepositQueueFactory",
      version: "dev",
      order: 133,
      path: "DispatcherOwnedBeaconFactory",
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },

        [updateName.SINGLE_ASSET_DEPOSIT_QUEUE_LIB_ADDRESS]: {
          value: null,
          order: 2,
        },
      },
    },
  ];

  for (const contractData of contracts) {
    console.log(contractData.name);

    await prisma.contract.create({
      data: {
        name: contractData.name,
        updateName: contractData.updateName,
        constructorDataUpdateName: contractData.constructorDataUpdateName,
        chain: "MAINNET",
        chainId: 1,
        version: contractData.version,
        order: contractData.order,
        data: contractData.data,
        path: contractData.path ? contractData.path : contractData.name,
      },
    });
  }

  await prisma.$disconnect();
  console.log("Contracts have been seeded!");
};

module.exports = {
  seedEthContracts,
};
