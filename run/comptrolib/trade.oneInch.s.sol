// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../../../contracts/external-interfaces/IOneInchV5AggregationRouter.sol";
import "./../../deploy/Addresses.sol";
import "./../vaultInfo/VaultInfo.sol";
interface IComptroller {
    function callOnExtension(address _extension, uint256 _actionId, bytes calldata _callArgs) external;
}

contract OneInchTrades is Script {

    address public constant COMPTROLLER = VultAddresses.COMPTROLLER_PROXY;
    address public constant INTEGRATION_MANAGER = Addresses.INTEGRATION_MANAGER;
    address public constant ONEINCH_V5_ADAPTER = 0x23dB61A962c469FDca45B1381385f70c5C21bc90;

    function decodeSwapData(bytes calldata data)
        external
        pure
        returns (
            bytes4 selector,
            address executor,
            IOneInchV5AggregationRouter.SwapDescription memory desc,
            bytes memory permit,
            bytes memory dataPart
        )
    {
        // Extract function selector (first 4 bytes)
        selector = bytes4(data[:4]);

        // Decode the arguments (skip the first 4 bytes for the selector)
        (executor, desc, permit, dataPart) =
            abi.decode(data[4:], (address, IOneInchV5AggregationRouter.SwapDescription, bytes, bytes));
    }

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Get the comptroller instance
        IComptroller comptrollerInstance = IComptroller(COMPTROLLER);

        //one inch api txData
        bytes memory oneInchData =
            hex"12aa3caf0000000000000000000000005141b82f5ffda4c6fe1e372978f1c5427640a190000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000005141b82f5ffda4c6fe1e372978f1c5427640a190000000000000000000000000ef816305e54008535e4998014cbba4b9c54b8768000000000000000000000000000000000000000000000000000009184e72a00000000000000000000000000000000000000000000000000000000000000045b7000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fb0000000000000000000000000000000000000000000000000000dd00004e00a0744c8c09c02aaa39b223fe8d0a0e5c4f27ead9083c756cc290cbe4bdd538d6e9b379bff5fe72c3d67a521de500000000000000000000000000000000000000000000000000000006fc23ac000c20c02aaa39b223fe8d0a0e5c4f27ead9083c756cc206da0fd433c1a5d7a4faa01111c044910a1845536ae40711b8002dc6c006da0fd433c1a5d7a4faa01111c044910a1845531111111254eeb25477b68fb85ed929f73a96058200000000000000000000000000000000000000000000000000000000000045b7c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000c8ffb297";

        (
            bytes4 selector,
            address executor,
            IOneInchV5AggregationRouter.SwapDescription memory desc,
            bytes memory permit,
            bytes memory dataPart
        ) = this.decodeSwapData(oneInchData);

        console.logAddress(executor);
        console.logAddress(desc.srcToken);
        console.logAddress(desc.dstToken);
        console.logAddress(desc.srcReceiver);
        console.logAddress(desc.dstReceiver);
        console.log(desc.amount);
        console.log(desc.minReturnAmount);
        console.log(desc.flags);
        console.logBytes(dataPart);
        bytes memory actionData = abi.encode(executor, desc, dataPart);
        bytes memory callArgs =
            abi.encode(ONEINCH_V5_ADAPTER, bytes4(keccak256("takeOrder(address,bytes,bytes)")), actionData);

        comptrollerInstance.callOnExtension(
            INTEGRATION_MANAGER,
            0, // actionId for callOnIntegration
            callArgs
        );

        // vm.stopBroadcast();
    }
}