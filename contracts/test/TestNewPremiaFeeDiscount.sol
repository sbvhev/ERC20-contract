// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';

import "../PremiaFeeDiscount.sol";

contract TestNewPremiaFeeDiscount is PremiaFeeDiscount {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using SafeCast for uint256;

    address public previousContract;

    constructor(address _previousContract, IERC20 _xPremia) PremiaFeeDiscount(_xPremia) {
        previousContract = _previousContract;
    }

    function migrate(address _user, uint256 _amount, uint256 _stakePeriod, uint256 _lockedUntil) external {
        require(msg.sender == previousContract);

        UserInfo storage user = userInfo[_user];

        xPremia.safeTransferFrom(msg.sender, address(this), _amount);
        user.balance = user.balance.add(_amount);

        if (_lockedUntil > user.lockedUntil) {
            user.stakePeriod = _stakePeriod.toUint64();
            user.lockedUntil = _lockedUntil.toUint64();
        }
    }
}
