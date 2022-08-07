import { readFileSync } from "fs"
import hre, { ethers, upgrades } from "hardhat"

const CONTRACT_NAME = "MainContract"

async function main() {
  const Contract = await ethers.getContractFactory(CONTRACT_NAME)
  
  const contract = await upgrades.deployProxy(Contract, [], {initializer: 'initialize', kind: 'transparent'})

  await contract.deployed()

  const networkName = (await contract.provider.getNetwork()).name
  const address = contract.address
  const abi = JSON.parse(readFileSync(`./artifacts/contracts/${CONTRACT_NAME}.sol/${CONTRACT_NAME}.json`, 'utf8')).abi

  console.log('*** beginning of json result ***')
  console.log(JSON.stringify({
    contract_deployments: {
      [networkName]: {
        [CONTRACT_NAME]: {
          address: address,
          abi: abi
        }
      }
    }
  }))
  console.log('*** end of json result ***')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
