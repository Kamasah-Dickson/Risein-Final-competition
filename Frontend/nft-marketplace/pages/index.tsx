import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
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
				<div className={styles.heroContainer}>
					<div className={styles.heroAssetFrame}>
						<div className={styles.heroBodyContainer}>
							<div className={styles.heroBody}>
								<h1 className={styles.heroTitle}>
									<span className={styles.heroTitleGradient}>
										Build NFT Marketplaces faster than ever.
									</span>
								</h1>

								<div className={styles.heroCtaContainer}>
									<Link className={styles.heroCta} href="/buy">
										Get Started
									</Link>
								</div>
							</div>
						</div>
						<Image
							src="/hero-asset.svg"
							width={860}
							height={540}
							alt="Hero asset, NFT marketplace"
							quality={100}
							className={styles.heroAsset}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
