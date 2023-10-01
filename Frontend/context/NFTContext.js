import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { MarketAddress, MarketAddressABI } from "./constants";

const subdomainName = "polyplace";

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_API_KEY_SECRET;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
	"base64"
)}`;

const endpointBasePath = `https://${subdomainName}.infura-ipfs.io/ipfs/`;

const client = ipfsHttpClient({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
	const nftCurrency = "BSC";
	const [currentAccount, setCurrentAccount] = useState("");
	const [isLoadingNFT, setIsLoadingNFT] = useState(false);

	const checkIfWalletIsConnect = async () => {
		if (!window.ethereum) return alert("Please install MetaMask.");

		const accounts = await window.ethereum.request({ method: "eth_accounts" });
		if (accounts.length) {
			setCurrentAccount(accounts[0]);
		} else {
			console.log("No accounts found");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnect();
	}, []);

	const connectWallet = async () => {
		if (!window.ethereum) return alert("Please install MetaMask.");

		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});

		setCurrentAccount(accounts[0]);
		window.location.reload();
	};

	const uploadToIPFS = async (file) => {
		try {
			const added = await client.add({ content: file });

			const url = `${endpointBasePath}/${added.path}`;

			console.log(`Upload to IPFS url: ${url}`);

			return url;
		} catch (error) {
			console.log("error uploading file");
		}
	};

	const createSale = async (url, formInputPrice, isReselling, id) => {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const price = ethers.utils.parseUnits(formInputPrice, "ether");
		const contract = fetchContract(signer);
		const listingPrice = await contract.getListingPrice();

		const transaction = !isReselling
			? await contract.createToken(url, price, {
					value: listingPrice.toString(),
			  })
			: await contract.resellToken(id, price, {
					value: listingPrice.toString(),
			  });

		setIsLoadingNFT(true);
		await transaction.wait();
	};

	const createNFT = async (formInput, fileUrl, router) => {
		const { name, description, price } = formInput;

		if (!name || !description || !price || !fileUrl) return;

		const data = JSON.stringify({ name, description, image: fileUrl });

		try {
			const added = await client.add(data);
			const url = endpointBasePath + added.path;

			console.log(`Created NFT url: ${url}`);

			await createSale(url, price);

			router.push("/");
		} catch (error) {
			console.log("error uploading file");
		}
	};

	const fetchNFTs = async () => {
		setIsLoadingNFT(false);
		const provider = new ethers.providers.JsonRpcProvider(
			"https://data-seed-prebsc-1-s1.binance.org:8545/"
		);
		const contract = fetchContract(provider);
		const data = await contract.fetchMarketItems();

		const items = await Promise.all(
			data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
				const tokenURI = await contract.tokenURI(tokenId);
				console.log("data", tokenURI);
				try {
					const {
						data: { image, name, description },
					} = await axios.get(tokenURI);
					const price = ethers.utils.formatUnits(
						unformattedPrice.toString(),
						"ether"
					);

					// return an object with relevant properties
					return {
						price,
						tokenId: tokenId.toNumber(),
						seller,
						owner,
						image,
						name,
						description,
						tokenURI,
					};
				} catch (error) {
					if (error.response && error.response.status === 404) {
						// handle 404 error here
						console.log("Token URI not found.");
						return null;
					}
					// handle other errors here
					console.error(error);
					return null;
				}
			})
		);

		return items;
	};

	const fetchMyNFTsOrListedNFTs = async (type) => {
		setIsLoadingNFT(false);
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const contract = fetchContract(signer);
		const data =
			type === "fetchItemsListed"
				? await contract.fetchItemsListed()
				: await contract.fetchMyNFTs();

		const items = await Promise.all(
			data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
				const tokenURI = await contract.tokenURI(tokenId);
				const {
					data: { image, name, description },
				} = await axios.get(tokenURI);
				const price = ethers.utils.formatUnits(
					unformattedPrice.toString(),
					"ether"
				);

				return {
					price,
					tokenId: tokenId.toNumber(),
					seller,
					owner,
					image,
					name,
					description,
					tokenURI,
				};
			})
		);
		return items;
	};

	const buyNft = async (nft) => {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			MarketAddress,
			MarketAddressABI,
			signer
		);

		const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
		const transaction = await contract.createMarketSale(nft.tokenId, {
			value: price,
		});

		setIsLoadingNFT(true);
		await transaction.wait();
		setIsLoadingNFT(false);
	};

	return (
		<NFTContext.Provider
			value={{
				nftCurrency,
				connectWallet,
				currentAccount,
				uploadToIPFS,
				createNFT,
				fetchNFTs,
				fetchMyNFTsOrListedNFTs,
				buyNft,
				createSale,
				isLoadingNFT,
			}}
		>
			{children}
		</NFTContext.Provider>
	);
};
