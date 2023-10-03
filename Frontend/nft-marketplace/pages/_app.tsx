import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar } from "../components/Navbar/Navbar";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebProvider
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
			activeChain={NETWORK}
		>
			{/* Progress bar when navigating between pages */}
			<NextNProgress
				color="var(--color-tertiary)"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>

			{/* Render the navigation menu above each component */}
			<Navbar />
			{/* Render the actual component (page) */}
			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
