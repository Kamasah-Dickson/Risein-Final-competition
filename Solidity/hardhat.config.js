require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const BINANCESCAN_API_KEY = process.env.BINANCESCAN_API_KEY;

module.exports = {
	solidity: "0.8.19",

	networks: {
		bnbchain: {
			url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
			accounts: [PRIVATE_KEY],
			chainId: 97,
		},
	},

	etherscan: {
		// yarn hardhat verify --network <NETWORK>
		apiKey: BINANCESCAN_API_KEY,
	},
};
