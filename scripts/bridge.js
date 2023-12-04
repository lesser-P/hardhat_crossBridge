const { ethers } = require('hardhat')
require('dotenv').config()
const abi = require('../artifacts/contracts/CrossChainToken.sol/CrossChainToken.json').abi

const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL
const MUMBAI_RPC = process.env.MUMBAI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const providerSepolia = new ethers.JsonRpcProvider(SEPOLIA_RPC)
const providerMumbai = new ethers.JsonRpcProvider(MUMBAI_RPC)

const SEPILIA_WALLET = new ethers.Wallet(PRIVATE_KEY, providerSepolia)
const MUMBAI_WALLET = new ethers.Wallet(PRIVATE_KEY, providerMumbai)

let sepoliaAddr = '0x2152b78ed8E26a64EF5468b089Cc68B495746B9B'
let mumbaiAddr = '0xaeD8d692aE698bd2cC43Cf60D62FAEb8f2409eFd'

const sepoliaToken = new ethers.Contract(sepoliaAddr, abi, SEPILIA_WALLET)
const mumbaiToken = new ethers.Contract(mumbaiAddr, abi, MUMBAI_WALLET)

async function main() {
  try {
    console.log('监听事件')

    //sepolia 链
    sepoliaToken.on('Bridge', async (user, amount) => {
      console.log(`sepolia Bridge Burn${amount} from ${user}`)
      // mint
      let tx = await mumbaiToken.mint(user, amount)
      await tx.wait()

      console.log(`mumbai mint ${amount} to ${user}`)
    })

    //mumbai 链
    mumbaiToken.on('Bridge', async (user, amount) => {
      console.log(`mumbai Bridge Burn${amount} from ${user}`)
      // mint
      let tx = await sepoliaToken.mint(user, amount)
      await tx.wait()

      console.log(`sepolia mint ${amount} to ${user}`)
    })
  } catch (e) {
    console.log(e)
  }
}

main()
