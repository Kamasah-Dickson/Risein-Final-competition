const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("BnbFaucet", function () {
	let user1, owner, bnbFaucet, BnbFaucetFactory;

	beforeEach(async () => {
		[user1, owner] = await ethers.getSigners();

		BnbFaucetFactory = await ethers.getContractFactory("BnbFaucet");
		bnbFaucet = await BnbFaucetFactory.deploy();
		await bnbFaucet.waitForDeployment();
	});

	it("should allow a user to request 3 BNB once every hour", async function () {
		// The first request should work
		const userBalanceBefore = await ethers.provider.getBalance(owner.address);
		await bnbFaucet.connect(user1);
		// await bnbFaucet.connect(user1).requestBNB(user1.address);
		const userBalanceAfter = await ethers.provider.getBalance(owner.address);

		console.log(await bnbFaucet.requestBNB(user1.address));
		// console.log(userBalanceBefore);
		// console.log(userBalanceAfter);
		// const userBalanceDiff = userBalanceAfter - userBalanceBefore;
		// expect(userBalanceDiff).to.equal(ethers.utils.parseEther("3"));

		// // Attempt to request again immediately (should fail)
		// await expect(bnbFaucet.connect(user1).RequestBNB()).to.be.revertedWith(
		// 	"You can only request BNB once every hour"
		// );

		// // Wait for an hour and try again (should work)
		// await ethers.provider.send("evm_increaseTime", [3600]); // Increase time by 1 hour
		// await bnbFaucet.connect(user1).RequestBNB();

		// // Check the lastFaucetTime has been updated
		// const lastFaucetTime = await bnbFaucet.lastFaucetTime();
		// expect(lastFaucetTime.toNumber()).to.be.above(0);
	});

	// it("should allow the owner to request BNB", async function () {
	//   // The owner can request BNB
	//   const ownerBalanceBefore = await owner.getBalance();
	//   await bnbFaucet.connect(owner).RequestBNB();
	//   const ownerBalanceAfter = await owner.getBalance();
	//   const ownerBalanceDiff = ownerBalanceAfter.sub(ownerBalanceBefore);
	//   expect(ownerBalanceDiff).to.equal(ethers.utils.parseEther("3"));

	//   // Check that the lastFaucetTime has been updated
	//   const lastFaucetTime = await bnbFaucet.lastFaucetTime();
	//   expect(lastFaucetTime.toNumber()).to.be.above(0);
	// });
});
