// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/release/core/fund-deployer/IFundDeployer.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";

contract SetVaultLib is Script {

    address public constant FUND_DEPLOYER = Addresses.FUND_DEPLOYER;

    address public constant VAULT_LIB = Addresses.VAULT_LIB;

    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        console.log("FUND_DEPLOYER", FUND_DEPLOYER);
        console.log("VAULT_LIB", VAULT_LIB);

        IFundDeployer fundDeployer = IFundDeployer(FUND_DEPLOYER);

        fundDeployer.setVaultLib(VAULT_LIB);

        vm.stopBroadcast();

    }
}