const express = require('express');
const app = express();
var Web3 = require('web3');
var web3 = new Web3();

var web3 = new Web3(Web3.givenProvider || "http://localhost:9545");

app.set('view engine','pug');
app.use(express.static('src/css'));
app.use(express.static('src/js'));

app.get('/', (req, res) => {        
    res.render('index', {
        title: "ACADEMIA TOKEN ICO",
        message: "ACADEMIA TOKEN ICO SALE"
    });
});

app.listen(3000, () => console.log("App is listening on port 3000"));