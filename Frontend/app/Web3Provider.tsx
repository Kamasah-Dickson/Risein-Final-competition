"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	base,
	zora,
	bscTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
	[bscTestnet, mainnet, polygon, optimism, arbitrum, base, zora],
	[publicProvider()]
);
const { connectors } = getDefaultWallets({
	appName: "BNB Faucet Pro",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
	chains,
});
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

const Web3Provider = ({ children }: { children: React.ReactElement }) => {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
		</WagmiConfig>
	);
};

export default Web3Provider;
