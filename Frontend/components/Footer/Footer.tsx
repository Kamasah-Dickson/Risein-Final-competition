import React from "react";
import styles from "./Footer.module.css";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

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
				<ul className={styles.list}>
					<li>
						<Link href={"/buy"}>Buy {`NFT's`}</Link>
					</li>
					<li>
						<Link href={"/sell"}>Sell {`NFT's`}</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
