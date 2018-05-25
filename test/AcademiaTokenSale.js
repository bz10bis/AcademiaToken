var AcademiaTokenSale = artifacts.require('./AcademiaTokenSale.sol');

contract('AcademiaTokenSale', function(accounts) {
    var tokenSaleInstance;

    it('Initializes with correct values', function() {
        return AcademiaTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance;
        });
    });
});