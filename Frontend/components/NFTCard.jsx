import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NFTContext } from '../context/NFTContext';
import { motion } from 'framer-motion';

import images from '../assets';
import { shortenAddress } from '../utils/index';
import { shortenPrice } from '../utils/index';
import { shortenName } from '../utils/index';

const NFTCard = ({ nft, onProfilePage }) => {
    const { nftCurrency } = useContext(NFTContext);

    return (
        <Link href={{ pathname: '/nft-details', query: nft }}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={e => { }}
                onHoverEnd={e => { }}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md hover:shadow-lg duration-500"
            >
                <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
                    <Image
                        className="flex justify-center items-center hover:scale-110 transition-all duration-500"
                        src={nft.image || images[`nft${nft.i}`]}
                        layout="fill"
                        objectFit="cover"
                        alt={`nft${nft.i}`}
                    />
                </div>
                <div className="mt-3 flex flex-col">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-xl">
                        {nft.name.length > 14 ? shortenName(nft.name) : nft.name}
                    </p>
                    <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
                        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">{nft.price > 100000 ? shortenPrice(nft.price) : nft.price} <span className="normal">{nftCurrency}</span></p>
                        <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-lg">{shortenAddress(onProfilePage ? nft.owner : nft.seller)}</p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default NFTCard;
