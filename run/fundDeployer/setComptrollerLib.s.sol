// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/release/core/fund-deployer/IFundDeployer.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";

contract SetComptrollerLib is Script {

    address public constant FUND_DEPLOYER = Addresses.FUND_DEPLOYER;
    address public constant COMPTROLLER_LIB = Addresses.COMPTROLLER_LIB;

    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        console.log("FUND_DEPLOYER", FUND_DEPLOYER);
        console.log("COMPTROLLER_LIB", COMPTROLLER_LIB);

        IFundDeployer fundDeployer = IFundDeployer(FUND_DEPLOYER);

        fundDeployer.setComptrollerLib(COMPTROLLER_LIB);

        vm.stopBroadcast();

    }
}
