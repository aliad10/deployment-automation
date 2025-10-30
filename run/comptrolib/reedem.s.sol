// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Import required Forge standard libraries
import "forge-std/Script.sol";
import "forge-std/console.sol";
import "./../../../contracts/external-interfaces/IERC20.sol"; 

// Import Comptroller interface from the Enzyme protocol
import "./../../../contracts/release/core/fund/comptroller/IComptroller.sol";
import "./../vaultInfo/VaultInfo.sol";

/// @notice Scripts to redeem fund shares using different methods in Enzyme Finance
contract EnzymeRedemptionScripts is Script {
    // Address of the fund's comptroller proxy
    address public constant COMPTROLLER = VultAddresses.COMPTROLLER_PROXY;
    
    // Common token addresses
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // Mainnet WETH address
    address public constant USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7; // USDT address

    // Address that will receive the redeemed assets
    address public constant recipient = 0xaE87F9BD09895f1aA21c5023b61EcD85Eba515D1;

    // Amount of shares to redeem
    uint256 public sharesQuantity = 5500000000000; // Adjust based on your needs

    /**
     * @notice Redeems shares for specific assets with specified percentages
     * @dev Use this when you want to receive specific assets in specific proportions
     */
    function redeemForSpecificAssets() external {
        // Get private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start transaction broadcast
        vm.startBroadcast(deployerPrivateKey);

        // Initialize comptroller interface
        IComptroller comptrollerProxy = IComptroller(COMPTROLLER);

        // Assets to receive upon redemption
        address[] memory payoutAssets = new address[](1);
        payoutAssets[0] = USDT; // Redeem for USDT only

        // Percentage distribution of assets (100% = 10000)
        uint256[] memory payoutAssetPercentages = new uint256[](1);
        payoutAssetPercentages[0] = 10000; // 100% in USDT
        
        console.log("Attempting to redeem shares for specific assets (USDT)...");
        
        // Execute share redemption with specific assets
        comptrollerProxy.redeemSharesForSpecificAssets(
            recipient, 
            sharesQuantity, 
            payoutAssets, 
            payoutAssetPercentages
        );

        console.log("Specific assets redemption successful!");

        // End transaction broadcast
        vm.stopBroadcast();
    }

    /**
     * @notice Redeems shares in kind (proportionate slice of all vault assets)
     * @dev Use this when you want a representative slice of all vault assets
     * @param skipAssets Optional list of assets to skip during redemption
     */
    function redeemInKind(address[] calldata skipAssets) external {
        // Get private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start transaction broadcast
        vm.startBroadcast(deployerPrivateKey);

        // Initialize comptroller interface
        IComptroller comptrollerProxy = IComptroller(COMPTROLLER);
        
        // No additional assets beyond what's tracked in the vault
        address[] memory additionalAssets = new address[](0);
        
        console.log("Attempting to redeem shares in kind...");
        
        // Execute share redemption in kind
        comptrollerProxy.redeemSharesInKind(
            recipient,
            sharesQuantity,
            additionalAssets,
            skipAssets
        );
        
        console.log("In-kind redemption successful!");

        // End transaction broadcast
        vm.stopBroadcast();
    }

    /**
     * @notice Checks vault balances before redemption
     * @dev Useful for debugging and determining how much you can redeem
     */
    function checkVaultBalances() external view returns (uint256 wethBalance, uint256 usdtBalance) {
        IComptroller comptrollerProxy = IComptroller(COMPTROLLER);
        address vaultProxy = comptrollerProxy.getVaultProxy();
        
        // Get token balances
        wethBalance = IERC20(WETH).balanceOf(vaultProxy);
        usdtBalance = IERC20(USDT).balanceOf(vaultProxy);
        
        // These would be logged in a non-view function
        // console.log("WETH Balance:", wethBalance);
        // console.log("USDT Balance:", usdtBalance);
        
        return (wethBalance, usdtBalance);
    }

    /**
     * @notice Main run function that serves as an entry point
     * @dev Select which redemption type to use
     */
    function run() external {
        // Get private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start transaction broadcast
        vm.startBroadcast(deployerPrivateKey);

        // Initialize comptroller interface
        IComptroller comptrollerProxy = IComptroller(COMPTROLLER);

        // Get and log the denomination asset
        address denomAsset = comptrollerProxy.getDenominationAsset();
        console.log("Denomination asset:", denomAsset);
        
        // Check vault balances to determine if redemption is possible
        address vaultProxy = comptrollerProxy.getVaultProxy();
        uint256 wethBalance = IERC20(WETH).balanceOf(vaultProxy);
        uint256 usdtBalance = IERC20(USDT).balanceOf(vaultProxy);
        
        console.log("WETH Balance:", wethBalance);
        console.log("USDT Balance:", usdtBalance);
        
        // For demonstration, uncomment one of these methods:
        
        // Option 1: Redeem for specific assets (like USDT)
        address[] memory payoutAssets = new address[](1);
        payoutAssets[0] = USDT;
        uint256[] memory payoutAssetPercentages = new uint256[](1);
        payoutAssetPercentages[0] = 10000;
        
        // comptrollerProxy.redeemSharesForSpecificAssets(
        //     recipient, 
        //     sharesQuantity, 
        //     payoutAssets, 
        //     payoutAssetPercentages
        // );
        
        // Option 2: Redeem in kind (proportionate slice of all assets)
        address[] memory additionalAssets = new address[](0);
        address[] memory assetsToSkip = new address[](0);
        comptrollerProxy.redeemSharesInKind(
            recipient,
            sharesQuantity,
            additionalAssets,
            assetsToSkip
        );

        console.log("Redemption successful!");

        // End transaction broadcast
        vm.stopBroadcast();
    }
}