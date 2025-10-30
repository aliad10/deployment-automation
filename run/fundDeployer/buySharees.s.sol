// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import "./../../../contracts/external-interfaces/IERC20.sol"; 


interface IComptroller {
    function buyShares(uint256 _investmentAmount, uint256 _minSharesQuantity)
        external
        returns (uint256 sharesReceived_);
}

contract BuyShares is Script {

//     Comptroller Proxy Address: 0xdF550baD6C024C490925bAE375Bf892F567452c0
//   Vault Proxy Address: 0x1617664E323A1FBa9FB25ED37Ef7Bb159C8cb200

    address public constant comptroller = 0xdF550baD6C024C490925bAE375Bf892F567452c0;


    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        address denominationAsset = 0x11920f139a3121c2836E01551D43F95B3c31159c; //weth

        IERC20 wethCon = IERC20(denominationAsset);
 
        // wethCon.approve(0x59699748f4425724d17Fe9b4dfB69379c659eD4b,1000 ether); //vault proxy address
 

        // IComptroller comptrollerI = IComptroller(comptroller);

        // comptrollerI.buyShares(0.001 ether, 10);

        vm.stopBroadcast();
    }
}
