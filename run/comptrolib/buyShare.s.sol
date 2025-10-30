// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "./../vaultInfo/VaultInfo.sol";

interface IWETH {
    function approve(address guy, uint wad) external returns (bool);
    function deposit() external payable;
    function balanceOf(address owner) external view returns (uint);
}

interface IComptroller {
    function buyShares(uint256 _investmentAmount, uint256 _minSharesQuantity)
        external
        returns (uint256 sharesReceived_);

        function getDenominationAsset() external view returns (address denominationAsset_);

    function getVaultProxy() external view returns (address vaultProxy_);

}

contract BuyShares is Script {
    address public constant COMPTROLLER = 0x8610078e627d4C721800416Efd8271DC11A089EC;
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // Mainnet WETH address

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // 1. Wrap ETH to get WETH
        // IWETH weth = IWETH(WETH);
        // weth.deposit{value: 0.0001 ether}(); // Convert 100 wei of ETH to WETH
        
        // 2. Check WETH balance
        // uint256 wethBalance = weth.balanceOf(address(this));
        // console.log("WETH Balance:", wethBalance);
        
        // // 3. Approve the Comptroller to spend WETH
        // weth.approve(COMPTROLLER, wethBalance);

        
        // 4. Call buyShares
        IComptroller comptrollerI = IComptroller(COMPTROLLER);
        // comptrollerI.buyShares(wethBalance, 1);
        address vaultProxy = comptrollerI.getVaultProxy();
        console.log("Vault Proxy:", vaultProxy);
        // console.log("Denomination Asset:", denominationAsset);

        vm.stopBroadcast();
    }
}