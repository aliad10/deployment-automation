// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/release/infrastructure/value-interpreter/IValueInterpreter.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";

contract SetEthUsd is Script {

    address public constant VALUE_INTERPRETER = Addresses.VALUE_INTERPRETER;
    address public constant ETH_USD_AGGREGATOR = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419;


    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        console.log("VALUE_INTERPRETER", VALUE_INTERPRETER);
        console.log("ETH_USD_AGGREGATOR", ETH_USD_AGGREGATOR);
        IValueInterpreter valueInterpreter = IValueInterpreter(VALUE_INTERPRETER);

        valueInterpreter.setEthUsdAggregator(ETH_USD_AGGREGATOR);

        vm.stopBroadcast();

    }
}



