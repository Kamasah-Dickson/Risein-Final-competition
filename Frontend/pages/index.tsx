import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import { useLayoutEffect } from "react";

const Home: NextPage = () => {
	const address = useAddress();
	const router = useRouter();

	const handleClick = () => {
		if (address) {
			router.replace("/buy");
		} else {
			toast.error("Connect your wallet to continue", {
				icon: "👣",
				style: toastStyle,
				position: "bottom-center",
			});
		}
	};

	useLayoutEffect(() => {
		if (!address) {
			toast.error("Please connect your wallet to access the marketplaces", {
				icon: "👣",
				style: toastStyle,
				position: "bottom-right",
			});
		}
	}, [address]);

	return (
		<div className={styles.container}>
			<div className={styles.heroBackground}>
				<div className={styles.heroBackgroundInner}>
					<Image
						src="/hero-gradient.png"
						width={1390}
						height={1390}
						alt="Background gradient from red to blue"
						quality={100}
						className={styles.gradient}
					/>
				</div>
			</div>
			<div className={styles.heroAssetFrame}>
				<div className={styles.heroBody}>
					<h1 className={styles.heroTitle}>
						Digital Odyssey{" "}
						<span className={styles.span}>NFT Marketplace.</span>
					</h1>
					<p className={styles.heroPara}>
						DOM is the number one leading NFT marketplace in the world. Explore
						the coolest,top rated and amazing {`NFT's`} around the world.
					</p>
					<button
						onClick={handleClick}
						type="button"
						className={styles.heroCta}
					>
						Explore Marketplace
					</button>
				</div>
				<Image
					src="/hero-asset.svg"
					width={860}
					height={700}
					alt="Hero asset, NFT marketplace"
					quality={100}
					className={styles.heroAsset}
				/>
			</div>
			<Toaster position="bottom-center" reverseOrder={false} />
		</div>
	);
};

export default Home;
