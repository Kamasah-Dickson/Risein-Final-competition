import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar } from "../components/Navbar/Navbar";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";
import Footer from "../components/Footer/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Digital Odyssey - NFT marketplace</title>
				des
			</Head>
			<ThirdwebProvider
				clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
				activeChain={NETWORK}
			>
				<NextNProgress
					color="var(--color-tertiary)"
					startPosition={0.3}
					stopDelayMs={200}
					height={3}
					showOnShallow={true}
				/>

				<Navbar />
				<Component {...pageProps} />
				<Footer />
			</ThirdwebProvider>
		</>
	);
}

export default MyApp;
