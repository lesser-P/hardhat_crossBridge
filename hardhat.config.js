require('dotenv').config()
require('@nomicfoundation/hardhat-toolbox')
// require("@nomiclabs/hardhat-etherscan");
require('hardhat-gas-reporter')
require('mocha')

// const SEPOLIA_RPC = process.env.SEPOLIA_RPC_HTTPS;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const APIKEY = process.env.VRFaddress

// console.log('API', APIKEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gas: 5000000,
      timeout: 10000000,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gas: 5000000,
      timeout: 10000000,
    },
    // fuji: {
    //   url: "https://api.avax-test.network/ext/C/rpc",
    //   accounts: [PRIVATE_KEY],
    //   chainId: 43113,
    //   live: true,
    //   saveDeployments: true,
    //   tags: ["staging"],
    //   gas: 5000000,
    //   timeout: 10000000,
    // },
  },
  // etherscan: {
  //   apiKey: APIKEY,
  // },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
      },
      {
        version: '0.8.18',
      },
      {
        version: '0.6.6',
      },
      {
        version: '0.8.9',
      },
    ],
  },
  gasReporter: {
    currency: 'CHF',
    gasPrice: 21,
  },
  etherscan: {
    apiKey: {
      sepolia: 'U7HUDBUKVSZ3NMXKXFK89AMUIICF4Y6BGH',
    },
  },
}
