// SPDX-License-Identifier: MIT 
pragma solidity 0.8.19; 
 
import "forge-std/Script.sol"; 
import "forge-std/console.sol"; 
 
import "./../../../contracts/external-interfaces/IERC20.sol"; 

import "./../../deploy/Addresses.sol";
import "./../vaultInfo/VaultInfo.sol";

contract CheckVaultBalance is Script { 
 
    address public constant Address = VultAddresses.VAULT_PROXY; 
    address public constant weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  
    function run() external { 
         
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY"); 
         
        vm.startBroadcast(deployerPrivateKey); 
 
        IERC20 wethCon = IERC20(weth);
 
        uint256 res = wethCon.balanceOf(Address); //vault proxy address
 
        console.log("res    ", res); //

        vm.stopBroadcast(); 
 
    } 
}