import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Web3Provider from "./Web3Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BNB Faucet Pro",
	description: "A free bnb testnet faucet portal",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Web3Provider>
				<body className={inter.className}>{children}</body>
			</Web3Provider>
		</html>
	);
}
