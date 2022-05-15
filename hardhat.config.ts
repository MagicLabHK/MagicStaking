import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import { config as envConfig } from "dotenv";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";

envConfig({ path: resolve(__dirname, "./.env") });
const privateKey = process.env.PRIVATE_KEY ?? `0x${"F".repeat(64)}`;
const etherscanKey = process.env.ETHERSCAN_KEY ?? "F".repeat(34);

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
      initialBaseFeePerGas: 0,
      hardfork: "london",
      chainId: 31337,
      gas: "auto",
      accounts: {
        count: 100,
      },
    },
    moonriver: {
      url: "https://rpc.moonriver.moonbeam.network",
      accounts: [privateKey],
      chainId: 1285,
    },
    moonbase: {
      url: "https://moonbeam-alpha.api.onfinality.io/public",
      accounts: [privateKey],
      chainId: 1287,
    },
  },
  mocha: {
    timeout: 500000,
  },
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: etherscanKey,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 21,
    enabled: true,
  },
};

export default config;
