// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/release/core/fund-deployer/IFundDeployer.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";

contract setReleaseLive is Script {

    address public constant FUND_DEPLOYER = Addresses.FUND_DEPLOYER;

    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        IFundDeployer fundDeployer = IFundDeployer(FUND_DEPLOYER);

        fundDeployer.setReleaseLive();

        vm.stopBroadcast();

    }
}