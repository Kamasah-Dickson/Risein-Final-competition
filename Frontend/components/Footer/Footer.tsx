import React from "react";
import styles from "./Footer.module.css";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	function getDate() {
		const date = new Date();
		return date.getFullYear();
	}

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<Link href={"/"} className={styles.logoContainer}>
					<Image src={logo} height={30} width={30} alt="" />
					<h3 className={styles.logoTitle}>Digital Odyssey</h3>
				</Link>

				<div className={styles.copyright}>
					&copy; All rights reserved {getDate()}{" "}
					<Link
						className={styles.creator}
						href={"https://github.com/Kamasah-Dickson"}
					>
						Kamasah Dickson
					</Link>
					✨
				</div>
				<ul className={styles.list}>
					<li>
						<Link href={"/buy"}>Buy {`NFT's`}</Link>
						<Link href={"/sell"}>Sell {`NFT's`}</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
