const { ethers, network } = require("hardhat");

const { readFileSync, writeFileSync } = require("fs");
require("dotenv").config(); // can modify this to work for you

const FRONT_END_ADDRESSES_FILE = "../frontend/constant/contractAddress.json";

const FRONT_END_ABI_FILE = "../frontend/constants/abi.json";
const UPDATE_FRONT_END = process.env.UPDATE_FRONT_END;

async function updateFrontend(address) {
	if (UPDATE_FRONT_END) {
		await updateContractAddressess(address);
		await updateAbi();
		console.log("Frontend updated✨");
	} else {
		console.log(
			"Frontend cannot be updated please make UPDATE_FRONT_END=true true in your .env file"
		);
	}
}

module.exports = updateFrontend;

async function updateAbi() {
	const BNBFaucetFactory = await ethers.getContractFactory("BnbFaucet");
	writeFileSync(
		FRONT_END_ABI_FILE,
		JSON.stringify(BNBFaucetFactory.interface.fragments)
	);
}

async function updateContractAddressess(address) {
	const chainId = network.config.chainId.toString();
	const currentAddresses = JSON.parse(
		readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
	);

	if (chainId in currentAddresses) {
		if (!currentAddresses[chainId].includes(address)) {
			currentAddresses[chainId].push(address);
		}
	} else {
		currentAddresses[chainId] = [address];
	}

	writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}
