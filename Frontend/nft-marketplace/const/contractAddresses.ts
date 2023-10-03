/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { BinanceTestnet } from "@thirdweb-dev/chains";
export const NETWORK = BinanceTestnet;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0xd86B3c4521185B25C60A8d84Faf9De24a3738b9C";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
	"0xb211fA82D375281831dD11891cC73D73c79114a4";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://testnet.bscscan.com/";
