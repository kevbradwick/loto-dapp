require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  paths: {
    sources: './src/solidity/contracts',
    tests: './src/solidity/tests',
    cache: './src/solidity/cache',
    artifacts: './src/solidity/artifacts'
  }
};
