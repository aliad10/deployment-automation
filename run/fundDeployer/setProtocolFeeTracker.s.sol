// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/release/core/fund-deployer/IFundDeployer.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";


contract SetProtocolFeeTracker is Script {

    address public constant FUND_DEPLOYER = Addresses.FUND_DEPLOYER;

    address public constant PROTOCOL_FEE_TRACKER = Addresses.PROTOCOL_FEE_TRACKER;

    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        console.log("FUND_DEPLOYER", FUND_DEPLOYER);
        console.log("PROTOCOL_FEE_TRACKER", PROTOCOL_FEE_TRACKER);

        IFundDeployer fundDeployer = IFundDeployer(FUND_DEPLOYER);

        fundDeployer.setProtocolFeeTracker(PROTOCOL_FEE_TRACKER);

        vm.stopBroadcast();

    }
}
