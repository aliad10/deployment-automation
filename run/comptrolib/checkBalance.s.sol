// SPDX-License-Identifier: MIT 
pragma solidity 0.8.19; 
 
import "forge-std/Script.sol"; 
import "forge-std/console.sol"; 
 
import "./../../../contracts/external-interfaces/IERC20.sol"; 
 
contract CheckBalance is Script { 
 
    address public constant vaultProxyAddress = 0x4013BB9eC371DaC4cFD92330Ee532db18f2b11D7; //vault proxy address
  
    function run() external { 
         
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); 
         
        vm.startBroadcast(deployerPrivateKey); 
 
        IERC20 comptrollerProxy = IERC20(vaultProxyAddress); 
 
        uint256 res = comptrollerProxy.balanceOf(0xaE87F9BD09895f1aA21c5023b61EcD85Eba515D1); //this is depositer 
 
        console.log("your share balance is", res); 
 
        vm.stopBroadcast(); 
 
    } 
}