import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { AiOutlineGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

export function Navbar() {
	const address = useAddress();

	return (
		<div className={styles.navContainer}>
			<nav className={styles.nav}>
				<div className={styles.navLeft}>
					<Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
						<Image
							src="/logo.png"
							width={48}
							height={48}
							alt="NFT marketplace sample logo"
						/>
					</Link>

					<div className={styles.navMiddle}>
						<Link href="/buy" className={styles.link}>
							Buy
						</Link>
						<Link href="/sell" className={styles.link}>
							Sell
						</Link>
					</div>
				</div>

				<ul className={styles.socialContainer}>
					<li>
						<Link
							href={
								"https://github.com/Kamasah-Dickson/Risein-Final-competition/tree/master"
							}
						>
							<AiOutlineGithub size={25} />
						</Link>
					</li>
					<li>
						<Link
							href={"https://www.linkedin.com/in/kamasah-dickson-8506a6230/"}
						>
							<BsLinkedin size={25} />
						</Link>
					</li>
					<li>
						<Link href={"https://twitter.com/Kamas_DEV"}>
							<FaXTwitter size={25} />
						</Link>
					</li>
				</ul>

				<div className={styles.navRight}>
					<div className={styles.navConnect}>
						<ConnectWallet theme="dark" btnTitle="Connect Wallet" />
					</div>
					{address && (
						<Link className={styles.link} href={`/profile/${address}`}>
							<Image
								className={styles.profileImage}
								src="/user-icon.png"
								width={42}
								height={42}
								alt="Profile"
							/>
						</Link>
					)}
				</div>
			</nav>
		</div>
	);
}
