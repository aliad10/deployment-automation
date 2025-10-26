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
      name: "ParaSwapV6Adapter",
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
  ];

  for (const contractData of contracts) {
    console.log(contractData);
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
      },
    });
  }

  await prisma.$disconnect();
  console.log("Contracts have been seeded!");
};

module.exports = {
  seedEthContracts,
};
