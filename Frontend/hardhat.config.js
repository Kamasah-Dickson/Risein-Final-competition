require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const NEXT_PRIVATE_KEY = process.env.NEXT_PRIVATE_KEY;

module.exports = {
	networks: {
		bnbchain: {
			url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
			accounts: NEXT_PRIVATE_KEY !== undefined ? [NEXT_PRIVATE_KEY] : [],
			chainId: 97,
			gas: 2100000,
			gasPrice: 5000000000,
		},
	},
	solidity: "0.8.4",
};
