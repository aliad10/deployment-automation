// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/release/infrastructure/value-interpreter/IValueInterpreter.sol";
import "forge-std/console.sol";
import "./../../../contracts/release/infrastructure/price-feeds/primitives/IChainlinkPriceFeedMixin.sol";
import "./../../deploy/Addresses.sol";

contract AddPrimitives is Script {

    address public constant VALUE_INTERPRETER = Addresses.VALUE_INTERPRETER;


address[] public primitives = [
    0x45804880De22913dAFE09f4980848ECE6EcbAf78,
    0x68749665FF8D2d112Fa859AA293F07A622782F38,
    0x467719aD09025FcC6cF6F8311755809d45a5E5f3,
    0x2dfF88A56767223A5529eA5960Da7A3F5f766406,
    0x046EeE2cc3188071C02BfC1745A6b17c656e3f3d,
    0x6B175474E89094C44Da98b954EedeAC495271d0F,
    0x853d955aCEf822Db058eb8505911ED77F175b99e,
    0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
];

address[] public aggregators = [
   0xb8Ff76931FD0ceDC9C5BAaD102C2556c5393FB9E,
    0x236a1FAb08eE2FDD882A31B0B9d1F1A2bE4BF927,
    0x7fD7eaA7488091ce7541B31b551E5403eB6C73a4,
    0x3c4989590477ADF675bD97128CC3805A6915337c,
    0x077D783B093A744167545Dbc5fC97124dbb5Bb82,
    0xA6Df7463041E3eD56bCD7C8C1be6B3F75b41A94B,
    0x5AfE4c9cf3948356f5F55E06Ecc6A24E645EFb94,
    0x3Cf9366E3b6578fBf8440cE5a3debA958e51b603
];

uint8[] public uint8RateAssets = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
];

    
    function convertToRateAsset(uint8[] memory uint8Array) internal pure returns (IChainlinkPriceFeedMixin.RateAsset[] memory) {
        IChainlinkPriceFeedMixin.RateAsset[] memory rateAssetsArray = new IChainlinkPriceFeedMixin.RateAsset[](uint8Array.length);
        
        for (uint256 i = 0; i < uint8Array.length; i++) {
            rateAssetsArray[i] = IChainlinkPriceFeedMixin.RateAsset(uint8Array[i]);
        }

        return rateAssetsArray;
    }

    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        IChainlinkPriceFeedMixin.RateAsset[] memory rateAssets = convertToRateAsset(uint8RateAssets);

        IValueInterpreter valueInterpreter = IValueInterpreter(VALUE_INTERPRETER);

        valueInterpreter.updatePrimitives(primitives,aggregators,rateAssets);
        // address x = valueInterpreter.getAggregatorForPrimitive(0x11920f139a3121c2836E01551D43F95B3c31159c);
        // console.log(x);
        vm.stopBroadcast();

    }
}



