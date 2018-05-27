var AcademiaDocumentStorage = artifacts.require('./AcademiaDocumentStorage.sol');

contract('AcademiaDocumentStorage', function(accounts) {

    it('Handle documents mapping', function() {
        return AcademiaDocumentStorage.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.documentsList(msg.sender);
        });
    });

});