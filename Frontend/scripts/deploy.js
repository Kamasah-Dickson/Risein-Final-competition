const { ethers, run } = require("hardhat");

async function main() {
	const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
	const nftMarketplace = await NFTMarketplace.deploy();

	await nftMarketplace.deployed();

	console.log("NFTMarketplace deployed to:", nftMarketplace.address);
	await nftMarketplace.deployTransaction.wait(6);
	await verify(nftMarketplace.address, []);
}

// automatically verify contract on bscscan
const verify = async (contractAddress, args) => {
	console.log("........verifying contract.......");

	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (e) {
		//check if already verified
		if (e.message.toLowerCase().includes("already verified")) {
			console.log("This contract is already verified!");
		} else {
			console.log(e);
		}
	}
};

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

/*
CODE EXPLANATION: 
This script deploys a contract named "NFTMarketplace" using the Hardhat environment. The deployed contract's address is logged in the console. 
In case of an error during deployment, an error message is logged in the console and the script exits with a status code of 1.
*/
