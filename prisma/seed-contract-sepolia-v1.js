const { PrismaClient } = require("@prisma/client");
const { updateName, constructorDataUpdateName } = require("./enum");
const prisma = new PrismaClient();
const { constructorData } = require("../consts");
const ethers = require("ethers");


const seedEthSepoliaContracts = async () => {
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
          value: constructorData.ETHEREUM.RELAY_HUB, // reza
          order: 2,
        },
        trustedForwarder: {
          value: constructorData.ETHEREUM.TRUSTED_FORWARDER, // reza
          order: 3,
        },
        depositCooldown: {
          value: 86400,
          order: 4,
        },
        depositMaxTotal: {
          value: ethers.parseEther("1"),
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
      updateName: [updateName.PROTOCOL_FEE_RESERVE_PROXY_ADDRESS],
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
          value: 553, //todo: check number
          order: 2,
        },
        wrappedNativeAssetAddress: {
          value: constructorData.ETHEREUM.WETH,
          order: 3,
        },
      },
    },

   
    {
      name: "ComptrollerLib",
      version: "dev",
      order: 64,
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
      order: 65,
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
      name: "AaveV2ATokenListOwner",
      version: "dev",
      order: 71,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        listDescription: {
          value: "Aave v2: aTokens",
          order: 2,
        },
        lendingPoolAddressProvider: {
          value: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
          order: 3,
        },
      },
    },
   
    {
      name: "ArbitraryLoanTotalNominalDeltaOracleModule",
      version: "dev",
      order: 76,
    },

    {
      name: "AssetValueCalculator",
      version: "dev",
      order: 77,
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
      order: 78,
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
      order: 79,
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
      order: 80,

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
      name: "CompoundV3CTokenListOwner",
      version: "dev",
      order: 85,
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
      order: 86,
    },
   
    {
      name: "EnzymeVaultPriceFeed",
      version: "dev",
      order: 89,
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
      updateName: [
        updateName.GATED_REDEMPTION_QUEUE_SHARES_WRAPPER_LIB_ADDRESS,
      ],
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
      name: "SharePriceThrottledAssetManagerLib",
      version: "dev",
      updateName: [updateName.SHARE_PRICE_THROTTLED_ASSET_MANAGER_LIB_ADDRESS],
      order: 109,
      data: {
        [updateName.ADDRESS_LIST_REGISTRY_ADDRESS]: {
          value: null,
          order: 1,
        },
        gsnTrustedForwardersAddressListId: {
          value: 598, //todo : check number
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
          value: 598, //todo: check number
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
          value: 598, //todo: check number
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
      name: "SmarDexUsdnNativeRateUsdAggregator",
      version: "dev",
      order: 115,
      data: {
        usdnProtocolAddress: {
          value: "0x656cB8C6d154Aad29d8771384089be5B5141f01a",
          order: 1,
        },
      },
    },

    {
      name: "SolvBtcYieldTokenRateUsdAggregatorFactory",
      version: "dev",
      order: 116,
    },
    // Stader contracts are not deployed on Sepolia; skip to avoid constructor revert
    // {
    //   name: "StaderSDPriceFeed",
    //   version: "dev",
    //   order: 117,
    //   data: {
    //     sdTokenAddress: {
    //       value: "<SEPOLIA_SD_TOKEN>",
    //       order: 1,
    //     },
    //     staderOracleAddress: {
    //       value: "<SEPOLIA_STADER_ORACLE>",
    //       order: 2,
    //     },
    //     wethAddress: {
    //       value: "<SEPOLIA_WETH>",
    //       order: 3,
    //     },
    //   },
    // },
    
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
    {
      name: "ThreeOneThirdAdapter",
      version: "dev",
      order: 68,
      data: {
        [updateName.INTEGRATION_MANAGER_ADDRESS]: {
          value: null,
          order: 1,
        },
        batchTradeAddress: {
          value: "0xD20c024560ccA40288C05BAB650ac087ae9b0f6e",
          order: 2,
        },
      },
    },
  ];

  // Ensure orders are incremental across all contracts
  contracts.forEach((contract, index) => {
    contract.order = index + 1;
  });

  for (const contractData of contracts) {
    console.log(contractData.name);

    await prisma.contract.upsert({
      where: {
        chain_name: {
          chain: "SEPOLIA",
          name: contractData.name,
        },
      },
      update: {
        updateName: contractData.updateName,
        constructorDataUpdateName: contractData.constructorDataUpdateName,
        chainId: 11155111,
        version: contractData.version,
        order: contractData.order,
        data: contractData.data,
        path: contractData.path ? contractData.path : contractData.name,
      },
      create: {
        name: contractData.name,
        updateName: contractData.updateName,
        constructorDataUpdateName: contractData.constructorDataUpdateName,
        chain: "SEPOLIA",
        chainId: 11155111,
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
  seedEthSepoliaContracts,
};
