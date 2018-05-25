const express = require('express');
const app = express();
var Web3 = require('web3');
var web3 = new Web3();

const App = {
    initWeb3: function() {
        console.log("Init web3:");
        if (typeof web3 !== 'undefined') {            
            web3 = new Web3(web3.currentProvider);
            console.log("\t-Metamask found");
          } else {
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
            console.log("\t-Metamask not found using default...");
          }
    }
}

app.set('view engine','pug');
app.use(express.static('src/css'));

app.get('/', (req, res) => {
    App.initWeb3();    
    res.render('index', {
        title: "ACADEMIA TOKEN ICO",
        message: "Hello world",
        coinbase: web3.eth.getBalance(web3.eth.coinbase)
    });
});

app.listen(3000, () => console.log("App is listening on port 3000"));