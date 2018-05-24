pragma solidity ^0.4.20;

import "./SafeMath.sol";

contract AcademiaToken {
    
    using SafeMath for uint256;

    string public name = "Academia Token";
    string public symbol = "ACT";
    uint8 public decimals = 18;
    uint public totalSupply;

    mapping (address => uint) public balanceOf;
    mapping (address => mapping (address => uint)) public allowance;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    constructor (uint _totalSupply) public {
        totalSupply = _totalSupply;        
        balanceOf[msg.sender] = _totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

}