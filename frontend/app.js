const express = require('express');
const app = express();

var Web3 = require('web3');

if (typeof web3 !== 'undefined') {            
    web3 = new Web3(web3.currentProvider);
    console.log("\t-Metamask found");
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    console.log("\t-Metamask not found using default...");
}
console.log(web3.accounts);
console.log(web3.eth.accounts[0]);
