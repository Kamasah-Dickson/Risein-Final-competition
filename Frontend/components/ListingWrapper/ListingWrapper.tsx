import { useContract, useNFT } from "@thirdweb-dev/react";
import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import { NFT_COLLECTION_ADDRESS } from "../../const/contractAddresses";
import styles from "../../styles/Buy.module.css";
import NFT from "../NFT/NFT";
import Skeleton from "../Skeleton/Skeleton";

type Props = {
  listing: DirectListingV3 | EnglishAuction;
};

/**
 * Accepts a listing and renders the associated NFT for it
 */
export default function ListingWrapper({ listing }: Props) {
  const { contract: nftContract } = useContract(NFT_COLLECTION_ADDRESS);

  const { data: nft, isLoading } = useNFT(nftContract, listing.asset.id);

  if (isLoading) {
    return (
      <div className={styles.nftContainer}>
        <Skeleton width={"100%"} height="312px" />
      </div>
    );
  }

  if (!nft) return null;

  return (
    <Link
      href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
      key={nft.metadata.id}
      className={styles.nftContainer}
    >
      <NFT nft={nft} />
    </Link>
  );
}
