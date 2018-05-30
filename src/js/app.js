App = {
    init: function() {
        console.log("########## ACADEMIA TOKEN MANAGER ##########");     
        this.initWeb3();   
    },

    web3,

    initWeb3: function() {
        if(typeof web3 !== 'undefined') {
            this.web3 = new Web3(web3.currentProvider);
        } else {
            console.log("- No web3 injection, you should try Metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
        this.web3.eth.getCoinbase(function(err, account) {
            if(err === null) {
                this.account = account;
                $('span#account-address').html(this.account);
            }
        });
        this.getCurrentNetwork();
    }, 

    getCurrentNetwork: function() {
        this.web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                    console.log("- Connected to mainnet");
                    $('span#current-network').html('Main Network');
                    break;
                case "2":
                    console.log("- Connected to deprecated Morden test network");
                    $('span#current-network').html('Deprecated Morden text Network');
                    break;
                case "3":
                    console.log("- Connected to Ropsten test network");
                    $('span#current-network').html('Ropsten test Network');
                    break;
                case "4":
                    console.log("- Connected to Rinkeby test network");
                    $('span#current-network').html('Rinkeby test Network');
                    break;
                case "42":
                    console.log("- Connected to Kovan test network");
                    $('span#current-network').html('Kovan test Network');
                    break;
                default:
                    console.log("- Connected to an unknow network");
                    $('span#current-network').html('Unknown Network');
            }
        });
    },

    updateInterface: function() {
        $('span#account-address').html(App.account);
        $('span#account-balance-eth').html(App.balance);
        this.getCurrentNetwork();
    },
    
    account: '',

    balance: ''

}

var accountInterval =  setInterval(function() {
    App.web3.eth.getCoinbase(function(err, account) {
        if(err === null) {
            if (App.account !== account) {
                App.account = account;
                App.web3.eth.getBalance(App.account, (err, balance) => {
                    App.balance = App.web3.fromWei(balance, "ether") + " ETH";
                });
            }
        }
        App.updateInterface();
    });
},1000)

$(function() {
    $(window).on('load', function() {
      App.init();
    });
  });