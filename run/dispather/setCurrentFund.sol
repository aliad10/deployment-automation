// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/persistent/dispatcher/IDispatcher.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";

contract SetCurrentFund is Script {

    address public constant DISPATCHER = Addresses.DISPATCHER;

    address public constant FUND_DEPLOYER = Addresses.FUND_DEPLOYER;

    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        console.log("DISPATCHER", DISPATCHER);
        console.log("FUND_DEPLOYER", FUND_DEPLOYER);

        IDispatcher dispatcher = IDispatcher(DISPATCHER);

        dispatcher.setCurrentFundDeployer(FUND_DEPLOYER);

        vm.stopBroadcast();

    }
}
