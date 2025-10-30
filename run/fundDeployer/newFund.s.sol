// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Import foundry standard library and console logging
import "forge-std/Script.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";
// Interface for the Fund Deployer contract - handles fund creation and vault management
interface IFundDeployer {
    // Sets and gets the vault library address
    function setVaultLib(address _vaultLib) external;
    function getVaultLib() external view returns (address vaultLib_);
    function setReleaseLive() external;

    // Creates a new fund with specified parameters
    function createNewFund(
        address _fundOwner,              // Address that will own the fund
        string calldata _fundName,       // Name of the fund
        string calldata _fundSymbol,     // Trading symbol for the fund
        address _denominationAsset,      // Base asset for the fund (e.g., WETH)
        uint256 _sharesActionTimelock,   // Timelock period for share actions
        bytes calldata _feeManagerConfigData,      // Configuration for fee management
        bytes calldata _policyManagerConfigData    // Configuration for policy management
    ) external returns (address comptrollerProxy_, address vaultProxy_);
}

// Interface defining fund configuration structures
interface IComptroller {
    // Main configuration structure for fund setup
    struct ConfigInput {
        address denominationAsset;       // Base asset address
        uint256 sharesActionTimelock;    // Timelock for share operations
        bytes feeManagerConfigData;      // Fee configuration
        bytes policyManagerConfigData;   // Policy configuration
        ExtensionConfigInput[] extensionsConfig;  // Additional extensions
    }

    // Structure for configuring fund extensions
    struct ExtensionConfigInput {
        address extension;   // Extension contract address
        bytes configData;    // Extension configuration data
    }
}

// Contract for deploying new funds
contract NewFund is Script {
    // Constants for fund deployment
    address public constant FUND_DEPLOYER = Addresses.FUND_DEPLOYER;  // Address of the fund deployer contract
    address public constant FUND_OWNER = 0xaE87F9BD09895f1aA21c5023b61EcD85Eba515D1;    // Address of the fund owner

    function run() external {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Initialize fund deployer interface
        IFundDeployer fundDeployer = IFundDeployer(FUND_DEPLOYER);

        // Set basic fund parameters
        string memory fundName = "ariza";
        string memory fundSymbol = "IZA";

        // Set fund configuration
        address denominationAsset = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; //
        uint256 sharesActionTimelock = 0; // No redemption limitation

        // Initialize empty configs for fee and policy management
        bytes memory feeManagerConfigData = "";
        bytes memory policyManagerConfigData = "";

        // Deploy the new fund and get proxy addresses
        (address comptrollerProxy, address vaultProxy) = fundDeployer.createNewFund(
            FUND_OWNER, 
            fundName,
            fundSymbol,
            denominationAsset,
            sharesActionTimelock,
            feeManagerConfigData,
            policyManagerConfigData
        );

        // Log the deployed addresses
        console.log("Comptroller Proxy Address:", comptrollerProxy);
        console.log("Vault Proxy Address:", vaultProxy);

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}