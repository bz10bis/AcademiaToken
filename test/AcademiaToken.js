var AcademiaToken = artifacts.require('./AcademiaToken.sol');

contract('AcademiaToken', function(accounts) {
    var tokenInstance;
    var ref_totalSupply = 1000000

    it('Initialize with correct values', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Academia Token', 'Has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol,'ACT', 'Has the correct symbol');
            return tokenInstance.decimals()
        });
    });

    it('Initialize and allocate tokens', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply, ref_totalSupply, 'Has the correct initial supply');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance, ref_totalSupply, 'Allocate token to master');
        });
    });

    it('Transfer tokens', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 999999999999999999999)
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, 'Returned true');
        });
    });
});