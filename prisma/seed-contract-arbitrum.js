const { PrismaClient } = require("@prisma/client");
const { updateName, constructorDataUpdateName } = require("./enum");
const prisma = new PrismaClient();
const { constructorData } = require("../consts");

const seedArbitrumContracts = async () => {
  console.log("Seeding contracts...");

  const contracts = [
    {
      name: "Dispatcher",
      version: "v4",
      updateName: updateName.DISPATCHER_ADDRESS,
      constructorDataUpdateName: constructorDataUpdateName.DISPATCHER,
      order: 1,
    },
    {
      name: "UintListRegistry",
      version: "v4",
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
      version: "v4",
      order: 3,
      data: {
        [updateName.DISPATCHER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "ExternalPositionFactory",
      version: "v4",
      updateName: updateName.EXTERNAL_POSITION_FACTORY_ADDRESS,
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

    {
      name: "GasRelayPaymasterFactory",
      version: "v4",
      updateName: updateName.GAS_RELAY_PAYMASTER_FACTORY_ADDRESS,
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

      version: "v4",
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
      version: "v4",
      updateName: updateName.FEE_MANAGER_ADDRESS,
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
      version: "v4",
      updateName: updateName.POLICY_MANAGER_ADDRESS,
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
      version: "v4",
      updateName: updateName.VALUE_INTERPRETER_ADDRESS,
      order: 10,
      data: {
        [updateName.FUND_DEPLOYER_ADDRESS]: {
          value: null,
          order: 1,
        },
        wethToken: {
          value: constructorData.ARBITRUM.WETH,
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
      version: "v4",
      order: 11,
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
      version: "v4",
      order: 12,
      updateName: updateName.EXTERNAL_POSITION_MANAGER_ADDRESS,
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
      version: "v4",
      updateName: updateName.PROTOCOL_FEE_TRACKER_ADDRESS,
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
      version: "v4",
      updateName: updateName.GLOBAL_CONFIG_LIB_ADDRESS,
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
      version: "v4",
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
      version: "v4",
      updateName: updateName.FUND_VALUE_CALCULATOR_ADDRESS,
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
      version: "v4",
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

      version: "v4",
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
          value: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
          order: 3,
        },
      },
    },

    {
      name: "UnpermissionedActionsWrapper",
      version: "v4",
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
      version: "v4",
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
          value: [],
          order: 3,
        },
      },
    },

    {
      name: "AaveV3FlashLoanAssetManagerLib",
      version: "dev",
      order: 22,
      updateName: updateName.AAVE_V3_FLASH_LOAN_ASSET_MANAGER_LIB_ADDRESS,
      data: {
        aavePoolAddressProviderAddress: {
          value: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
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
      version: "v4",
      updateName: updateName.PROTOCOL_FEE_RESERVE_LIB_ADDRESS,
      order: 23,
    },
    {
      name: "ProtocolFeeReserveProxy",
      version: "v4",
      updateName: updateName.PROTOCOL_FEE_RESERVE_PROXY_ADDRESS,
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
      version: "v4",
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
          value: constructorData.ARBITRUM.MLN_TOKEN,
          order: 5,
        },
        [updateName.PROTOCOL_FEE_RESERVE_PROXY_ADDRESS]: {
          value: null,
          order: 6,
        },
        wethToken: {
          value: constructorData.ARBITRUM.WETH,
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
      order: 28,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
      },
    },
    {
      name: "NoDepegOnRedeemSharesForSpecificAssetsPolicy",
      version: "v4",
      order: 29,
      data: {
        [updateName.POLICY_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        [updateName.VALUE_INTERPRETER_ADDRESS]: {
          //ts-check  used IValueInterpreter as input
          value: null,
          order: 2,
        },
      },
    },
    {
      name: "MinSharesSupplyFee",
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
      version: "v4",
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
          value: constructorData.ARBITRUM.WETH,
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
      version: "v4",
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
          value: constructorData.ARBITRUM.WETH,
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
      version: "v4",
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
          value: constructorData.ARBITRUM.WETH,
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
      version: "v4",
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
      version: "v4",
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
    {
      name: "AaveV3DebtPositionParser",
      version: "dev",
      order: 51,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        aTokenListId: {
          value: 8,
          order: 2,
        },
      },
    },

    {
      name: "BalancerV2LiquidityAdapter",
      version: "v4",
      order: 52,
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
          value: "0x0000000000000000000000000000000000000000",
          order: 3,
        },
        balTokenAddress: {
          value: "0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8",
          order: 4,
        },
      },
    },

    {
      name: "UniswapV3LiquidityPositionParser",
      version: "v4",
      order: 53,
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
      version: "v4",
      order: 54,
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
      order: 55,
      data: {
        dataProviderAddress: {
          //ts-check IAaveV3ProtocolDataProvider interface
          value: "0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654",
          order: 1,
        },
        lendingPoolAddressProviderAddress: {
          //ts-check IAaveV3PoolAddressProvider interface
          value: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
          order: 2,
        },
        referralCode: {
          value: 0,
          order: 3,
        },
        rewardsControllerAddress: {
          //ts-check IAaveV3RewardsController interface
          value: "0x929EC64c34a17401F460460D4B9390518E5B473e",
          order: 4,
        },
      },
    },
    {
      name: "ParaSwapV5Adapter",
      version: "dev",
      order: 56,
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
    {
      name: "GMXV2LeverageTradingPositionParser",
      version: "dev",
      order: 57,
      data: {
        wrappedNativeTokenAddress: {
          value: constructorData.ARBITRUM.WETH,
          order: 1,
        },
        dataStoreAddress: {
          value: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
          order: 2,
        },
        readerAddress: {
          //ts-check IGMXV2Reader interface
          value: "0x5Ca84c34a381434786738735265b9f3FD814b824",
          order: 3,
        },
      },
    },
    {
      name: "ManualValueOracleLib",
      version: "v4",
      order: 58,
    },
    {
      name: "ManualValueOracleFactory",
      version: "v4",
      order: 59,
    },
    {
      name: "TheGraphDelegationPositionParser",
      version: "v4",
      order: 60,
      data: {
        grtTokenAddress: {
          value: constructorData.ARBITRUM.GRT_TOKEN,
          order: 1,
        },
      },
    },
    {
      name: "TheGraphDelegationPositionLib",
      version: "v4",
      order: 61,
      data: {
        stakingProxyAddress: {
          value: "0x00669A4CF01450B64E8A2A20E9b1FCB71E61eF03",
          order: 1,
        },
        grtTokenAddress: {
          value: constructorData.ARBITRUM.GRT_TOKEN,
          order: 2,
        },
      },
    },
    {
      name: "TransferAssetsAdapter",
      version: "dev",
      order: 62,
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
      order: 63,
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
      version: "v4",
      order: 64,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        allowedExchangesListId: {
          value: 5,
          order: 2,
        },
        wrappedNativeAssetAddress: {
          //ts-check IWETH interface
          value: constructorData.ARBITRUM.WETH,
          order: 3,
        },
      },
    },

    {
      name: "GMXV2LeverageTradingPositionLib",
      version: "dev",
      order: 65,
      data: {
        wrappedNativeTokenAddress: {
          //ts-check IWETH interface
          value: constructorData.ARBITRUM.WETH,
          order: 1,
        },
        dataStoreAddress: {
          //ts-check IGMXV2DataStore interface
          value: "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8",
          order: 2,
        },
        chainlinkPriceFeedProviderAddress: {
          //ts-check IGMXV2ChainlinkPriceFeedProvider interface
          value: "0x527FB0bCfF63C47761039bB386cFE181A92a4701",
          order: 3,
        },
        readerAddress: {
          //ts-check IGMXV2Reader interface
          value: "0x5Ca84c34a381434786738735265b9f3FD814b824",
          order: 4,
        },
        roleStoreAddress: {
          //ts-check IGMXV2RoleStore interface
          value: "0x3c3d99FD298f679DBC2CEcd132b4eC4d0F5e6e72",
          order: 5,
        },
        callbackGasLimit: {
          value: 750000,
          order: 6,
        },
        referralCode: {
          value: constructorData.ARBITRUM.ZERO_BYTES32,
          order: 7,
        },
        referralStorageAddress: {
          value: "0xe6fab3F0c7199b0d34d7FbE83394fc0e0D06e99d",
          order: 8,
        },
        uiFeeReceiverAddress: {
          value: "0xaE87F9BD09895f1aA21c5023b61EcD85Eba515D1",
          order: 9,
        },
      },
    },

    {
      name: "ComptrollerLib",
      version: "v4",
      order: 66,
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
          value: constructorData.ARBITRUM.MLN_TOKEN,
          order: 10,
        },
        wrappedNativeTokenAddress: {
          value: constructorData.ARBITRUM.WETH,
          order: 11,
        },
      },
    },
    {
      name: "BalancerV2WeightedPoolPriceFeed",
      version: "v4",
      order: 67,
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
          value: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
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
      version: "v4",
      order: 68,
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
          value: 8,
          order: 3,
        },
        aavePoolAddress: {
          value: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
          order: 4,
        },
        referralCode: {
          value: 0,
          order: 5,
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
        chain: "ARBITRUM",
        chainId: 42161,
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
  seedArbitrumContracts,
};
