import { readFileSync } from "fs"
import hre, { ethers, upgrades } from "hardhat"
import _ from "lodash"
import getConfig from "../../lib/getConfig"

const contractNames = ["MainContract"]

async function main() {

  const prevContractDeployments = getConfig().public.contract_deployments

  let contractDeployments: any = {}

  for (const contractName of contractNames) {
    console.log('handling contract: ' + contractName)

    const Contract = await ethers.getContractFactory(contractName)
    const networkName = hre.network.name

    let address: string = prevContractDeployments[networkName]?.[contractName]?.address
    if (address) {
      console.log('already deployed, need to upgrade')
      await upgrades.upgradeProxy(address, Contract)
    } else {
      console.log('not already deployed, need to deploy fresh')
      const contract = await upgrades.deployProxy(Contract, [], { initializer: 'initialize', kind: 'transparent' })

      await contract.deployed()

      // const networkName = (await contract.provider.getNetwork()).name
      address = contract.address
    }

    const abi = JSON.parse(readFileSync(`./artifacts/contracts/${contractName}.sol/${contractName}.json`, 'utf8')).abi

    _.merge(contractDeployments, {
      [networkName]: {
        [contractName]: {
          address: address,
          abi: abi
        }
      }
    })
  }

  console.log('*** beginning of json result ***')
  console.log(JSON.stringify({
    contract_deployments: contractDeployments
  }))
  console.log('*** end of json result ***')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
