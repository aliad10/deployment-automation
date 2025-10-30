// SPDX-License-Identifier: MIT 
pragma solidity 0.8.19; 
 
import "forge-std/Script.sol"; 
import "forge-std/console.sol"; 
import "./../../deploy/Addresses.sol";
import "./../../../contracts/external-interfaces/IParaSwapV6AugustusSwapper.sol";
import "./../vaultInfo/VaultInfo.sol";

interface IComptroller { 
    function callOnExtension(address _extension, uint256 _actionId, bytes calldata _callArgs) external; 
}

interface IParaSwapV6Adapter {
    enum Action {
        SwapExactAmountIn,
        SwapExactAmountOut
    }

    struct SwapData {
        address srcToken;
        address destToken;
        uint256 fromAmount;
        uint256 toAmount;
        uint256 quotedAmount;
        bytes32 metadata;
    }

    struct SwapActionArgs {
        address executor;
        SwapData swapData;
        uint256 partnerAndFee;
        bytes executorData;
    }
}
 
contract ParaSwapTrades is Script { 
    // Enzyme Finance addresses
    address public constant COMPTROLLER = VultAddresses.COMPTROLLER_PROXY;
    address public constant INTEGRATION_MANAGER = Addresses.INTEGRATION_MANAGER;
    address public constant PARASWAP_V6_ADAPTER = 0xE198729c5d7A5058F76CC3e3020B3dCC36687b11;
    
    // ParaSwap addresses - from API data
    address public constant AUGUSTUS_SWAPPER = 0x6A000F20005980200259B80c5102003040001068;
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Get the comptroller instance
        IComptroller comptrollerInstance = IComptroller(COMPTROLLER);
        
        // Token information from updated API data
        address augustusSwapperAddress = 0x6A000F20005980200259B80c5102003040001068; // Provided Augustus Swapper address

        address srcToken = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2; // WETH
        address destToken = 0xdAC17F958D2ee523a2206206994597C13D831ec7; // USDT
        uint256 fromAmount = 10000000000000; // 0.00001 WETH - updated from API data
        uint256 minToAmount = 18455; // Minimum amount to receive
        uint256 quotedAmount = 18642; // Quoted amount from API
        
        // Extracted executor data from new API data
        bytes memory executorData = hex"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002c0831bf48183b999fde45294b14b55199072f0801b000000c000440084ff00000b00000000000000000000000000000000000000000000000000000000c31b8d7a000000000000000000000000000010036c0190e009a000d0fc3541100a07380a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009184e72a000000000000000000000000000fffd8963efd1fc6a506488495d951d5263988d25000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000006000240000ff00000300000000000000000000000000000000000000000000000000000000a9059cbb0000000000000000000000005b6a0771c752e35b2ca2aff4f22a66b1598a2bc500000000000000000000000000000000000000000000000000000000000048cf5b6a0771c752e35b2ca2aff4f22a66b1598a2bc5000001000024000020000003000000000000000000000000000000000000000000000000000000003eece7db0000000000000000000000006a000f20005980200259b80c510200304000106800000000000000000000000000000000000000000000000000000000000048cf00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006100000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000";
        


        // Use your address as the executor from API data
        address executor = 0x000010036C0190E009a000d0fc3541100A07380A;
        
        // Create the SwapData struct with the updated data
        IParaSwapV6Adapter.SwapData memory swapData = IParaSwapV6Adapter.SwapData({
            srcToken: srcToken,
            destToken: destToken,
            fromAmount: fromAmount,
            toAmount: minToAmount, // Using minimum amount to receive
            quotedAmount: quotedAmount,   // Exact quoted amount from API
            metadata: 0x9cb547d0761445bca9047aa6d8f7a2420000000000000000000000000152618c   // Empty metadata as it's in executorData
        });
        
        // Create the SwapActionArgs struct
        IParaSwapV6Adapter.SwapActionArgs memory swapArgs = IParaSwapV6Adapter.SwapActionArgs({
            executor: executor,
            swapData: swapData,
            partnerAndFee: 4951760157141521099596496896,      // No partner fee
            executorData: executorData
        });
        
        // Encode the action data - MUST use SwapExactAmountIn as per the adapter implementation
        bytes memory actionData = abi.encode(IParaSwapV6Adapter.Action.SwapExactAmountOut, abi.encode(swapArgs));
        
        
        // Create the callArgs for callOnExtension
        bytes memory callArgs = abi.encode(
            PARASWAP_V6_ADAPTER, 
            bytes4(keccak256("action(address,bytes,bytes)")), 
            actionData
        );
        console.logBytes(abi.encode(swapArgs));

        comptrollerInstance.callOnExtension(
            INTEGRATION_MANAGER,
            0, // actionId for callOnIntegration
            callArgs
        );
        
        vm.stopBroadcast();
    }
}