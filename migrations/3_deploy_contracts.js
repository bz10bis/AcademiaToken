var AcademiaToken = artifacts.require("./AcademiaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AcademiaToken, 1000000);
};
