// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MainToken.sol";
import "./SafeMath.sol";

contract Crowdsale {
    using SafeMath for uint256;

    MainToken public token;
    address public wallet;
    uint256 public rate;
    uint256 public weiRaised;

    event TokensPurchased(
        address indexed purchaser,
        address indexed beneficiary,
        uint256 value,
        uint256 amount
    );

    constructor(
        uint256 _rate,
        address _wallet,
        MainToken _token
    ) {
        require(_rate > 0, "Crowdsale: rate is 0");
        require(_wallet != address(0), "Crowdsale: wallet is the zero address");
        
        rate = _rate;
        wallet = _wallet;
        token = _token;
    }

    receive() external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(beneficiary, weiAmount);

        uint256 tokens = _getTokenAmount(weiAmount);

        weiRaised = weiRaised.add(weiAmount);

        _processPurchase(beneficiary, tokens);
        emit TokensPurchased(msg.sender, beneficiary, weiAmount, tokens);

        _updatePurchasingState(beneficiary, weiAmount);
        _forwardFunds();
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal pure {
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(weiAmount != 0, "Crowdsale: weiAmount is 0");
    }

    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(rate);
    }

    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        token.mint(beneficiary, tokenAmount);
    }

    function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal pure {
        // Optional state update for child contracts
    }

    function _forwardFunds() internal {
        payable(wallet).transfer(msg.value);
    }
}