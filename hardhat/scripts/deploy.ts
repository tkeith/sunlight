import { readFileSync } from "fs"
import hre, { ethers, upgrades } from "hardhat"
import _ from "lodash"

const contract_names = ["MainContract"]

async function main() {

  let contractDeployments: any = {}

  for (const contract_name of contract_names) {
    const Contract = await ethers.getContractFactory(contract_name)

    const contract = await upgrades.deployProxy(Contract, [], { initializer: 'initialize', kind: 'transparent' })

    await contract.deployed()

    const networkName = (await contract.provider.getNetwork()).name
    const address = contract.address
    const abi = JSON.parse(readFileSync(`./artifacts/contracts/${contract_name}.sol/${contract_name}.json`, 'utf8')).abi

    _.merge(contractDeployments, {
      [networkName]: {
        [contract_name]: {
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
