pragma solidity ^0.4.2;

import "./SafeMath.sol";

contract AcademiaTokenInterface {
    function balanceOf(address _admin) public returns(uint);
    function transfer(address _to, uint _value) public returns (bool success);
}

contract AcademiaTokenSale {

    using SafeMath for uint256;

    AcademiaTokenInterface academiaTokenContract;
    uint public tokenPrice;
    uint public tokenSold;
    address private admin;

    event Sell(
        address buyer,
        uint amount
    );

    event UpdateAddress(
        address admin,
        address newAddress
    );

    event AdminChanged(
        address admin,
        address newAdmin
    );

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    constructor(address _tokenAddress, uint _tokenPrice) public {
        tokenPrice = _tokenPrice;
        admin = msg.sender;
        academiaTokenContract = AcademiaTokenInterface(_tokenAddress);
    }

    function setAcademiaTokenContractAddress(address _tokenAddress) external onlyAdmin {
        academiaTokenContract = AcademiaTokenInterface(_tokenAddress);
        emit UpdateAddress(msg.sender, _tokenAddress);
    }

    function transferAdminRight(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0));
        emit AdminChanged(admin, _newAdmin);
        admin = _newAdmin;
    }

    function buyToken(uint _nbrOfTokens) public payable {
        require(msg.value == _nbrOfTokens.mul(tokenPrice));
        require(academiaTokenContract.balanceOf(this) >= _nbrOfTokens);
        require(academiaTokenContract.transfer(msg.sender, _nbrOfTokens));
        tokenSold = tokenSold.add(_nbrOfTokens);
        emit Sell(msg.sender, _nbrOfTokens);
    }
}