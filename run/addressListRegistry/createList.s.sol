// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "./../../../contracts/persistent/address-list-registry/IAddressListRegistry.sol";
import "forge-std/console.sol";
import "./../../deploy/Addresses.sol";

contract CreateList is Script {


    address public constant ADDRESS_LIST_REGISTRY = Addresses.ADDRESS_LIST_REGISTRY;

    // dispatcher
    address public constant owner = Addresses.DISPATCHER;

    IAddressListRegistry.UpdateType public constant updateType = IAddressListRegistry.UpdateType.AddAndRemove;

    address[] public _initialItems;

    function run() external {
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        IAddressListRegistry addressListRegistry = IAddressListRegistry(ADDRESS_LIST_REGISTRY);

        addressListRegistry.createList(owner,updateType,_initialItems);

        vm.stopBroadcast();

    }
}