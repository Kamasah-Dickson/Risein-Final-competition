// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

contract faucet {
    //state variable to keep track of owner and amount of ETHER to dispense
    address public owner;
    uint public amountAllowed = 1000000000000000000;

    //mapping to keep track of requested tokens
    //Address and blocktime + 1 day is saved in TimeLock
    mapping(address => uint) public lockTime;

    //constructor to set the owner
    constructor() payable {
        owner = msg.sender;
    }

    //function modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    //function to change the owner.  Only the owner of the contract can call this function
    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    //function to send tokens from faucet to an address
    function requestTokens(address payable _requestor) public payable {
        //perform a few checks to make sure function can execute
        require(
            block.timestamp > lockTime[msg.sender],
            "lock time has not expired. Please try again later"
        );
        require(
            address(this).balance > amountAllowed,
            "Not enough funds in the faucet. Please donate"
        );

        //if the balance of this contract is greater then the requested amount send funds
        _requestor.transfer(amountAllowed);

        //updates locktime 1hour day from now
        lockTime[msg.sender] = block.timestamp + 1 hours;
    }
}
