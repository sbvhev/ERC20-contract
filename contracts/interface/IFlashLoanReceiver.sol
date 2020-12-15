// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

interface IFlashLoanReceiver {
    function execute(address _tokenAddress, uint256 _amount) external;
}