const { ethers } = require('hardhat')
require('dotenv').config()

async function main() {
  const factory = await ethers.getContractFactory('CrossChainToken')
  const contract = await factory.deploy()
  await contract.waitForDeployment()
  console.log('Contract deployed to:', contract.target)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
