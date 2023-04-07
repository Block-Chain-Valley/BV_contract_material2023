import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    baobab: {
      url: "https://public-node-api.klaytnapi.com/v1/baobab",
      // accounts: {
      //   mnemonic:
      //     "link barely wood display note eager blind dream excite accuse mango step",
      // },
      accounts: {
        mnemonic:
          "link barely wood display note eager blind dream excite accuse mango step",
      },
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/I3TZIvYkW57wS_Zzebd4BLd4qU7YX_mD",
      accounts: {
        mnemonic:
          "link barely wood display note eager blind dream excite accuse mango step",
      },
    },
  },
  solidity: {
    version: "0.8.17",
  },
};
export default config;
