import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import '@openzeppelin/hardhat-upgrades';
import getConfig from '../lib/getConfig'

const config: HardhatUserConfig = {
  solidity: "0.8.15",
  defaultNetwork: "matic",
  networks: {
    matic: {
      url: "https://polygon-rpc.com/",
      // accounts: [process.env.PRIVATE_KEY ?? '']
      accounts: [getConfig().deployer.deployer_wallet_private_key]
    }
  },
  etherscan: {
    // apiKey: process.env.POLYGONSCAN_API_KEY
    apiKey: getConfig().deployer.polygonscan_api_key
  }
};

export default config;
