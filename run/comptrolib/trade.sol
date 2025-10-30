// // SPDX-License-Identifier: MIT 
// pragma solidity 0.8.19; 
 
// import "forge-std/Script.sol"; 
// import "forge-std/console.sol"; 
 
// interface IComptroller { 
//     function callOnExtension(address _extension, uint256 _actionId, bytes calldata _callArgs) external; 
// } 
 
// contract Trades is Script { 
//     address public constant comptroller = 0xb1b99fb0efcc4d1dcc7496f8f997ceda92e80224; 
 
//     function encodeCallArgs( 
//         address adapter, 
//         bytes4 selector, 
//         address[] memory pathAddresses, 
//         uint24[] memory pathFees, 
//         uint256 outgoingAssetAmount, 
//         uint256 minIncomingAssetAmount 
//     ) public pure returns (bytes memory) { 
//         // Encode the arguments for __decodeCallArgs 
//         bytes memory integrationData = abi.encode(pathAddresses, pathFees, outgoingAssetAmount, minIncomingAssetAmount); 
 
//         // Encode the arguments for __decodeCallOnIntegrationArgs 
//         return abi.encode(adapter, selector, integrationData); 
//     } 
 
//     function run() external { 
//         uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); 
 
//         vm.startBroadcast(deployerPrivateKey); 
 
//         IComptroller comptrollerI = IComptroller(comptroller); 
 
//         address adapter = 0x59699748f4425724d17Fe9b4dfB69379c659eD4b; //uniswap v3 adaptor 
//         bytes4 selector = bytes4(keccak256("takeOrder(address,bytes,bytes)")); 
 
//         address[] memory pathAddresses; // Declares a memory array of type address[] 
//         uint24[] memory pathFees; // Declares a memory array of type uint24[] 
 
//         pathAddresses = new address[](2); 
 
//         pathFees = new uint24[](1); // Allocates space for 1 uint24 element 
 
//         // Step 3: Assign values to the arrays 
//         pathAddresses[0] = 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9; //weth
//         pathAddresses[1] = 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1; //usdt
 
//         pathFees[0] = 500; //fee
 
//         uint256 outgoingAssetAmount = 100000;
//         uint256 minIncomingAssetAmount = 1; //MinAmountOut
 
//         bytes memory callArgs = 
//         bytes memory callArgs = 
//             encodeCallArgs(adapter, selector, pathAddresses, pathFees, outgoingAssetAmount, minIncomingAssetAmount); 

//         console.logBytes(callArgs);
 
//         // comptrollerI.callOnExtension( 
//         //     0x369373dE3A389047aD7e7846470Eb8324fc3Fe8E, //Integration manager address
//         //     0, //action id
//         //     hex"00000000000000000000000059699748f4425724d17fe9b4dfb69379c659ed4b03e38a2b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000011920f139a3121c2836e01551d43f95b3c31159c000000000000000000000000fd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000bb8" 
//         // ); 
 
//         // console.log("callArgs   ", callArgs); 
 
//         vm.stopBroadcast(); 
//     } 
// }
