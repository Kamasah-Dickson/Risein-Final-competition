import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
    const { nftCurrency } = useContext(NFTContext);

    const shouldRender = rank <= 10;

    return shouldRender ? (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4 shadow-md"
        >
            <div className="w-8 h-8 minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter rounded-full">
                <p className="font-poppins text-white font-semibold text-base minlg:text-lg">{rank}</p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1 }}
                className="my-2 flex justify-center"
            >
                <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
                    {creatorImage && (
                        <Image
                            src={creatorImage}
                            layout="fill"
                            objectFit="cover"
                            alt="creatorName"
                            className="rounded-full"
                        />
                    )}
                    <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
                        {images.tick && (
                            <Image
                                src={images.tick}
                                layout="fill"
                                objectFit="contain"
                                alt="tick"
                            />
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
                    {creatorName}
                </p>
                <p className="mt-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
                    {creatorEths.toFixed(2)} <span className="font-normal">{nftCurrency}</span>
                </p>
            </div>
        </motion.div>
    ) : null;
};

export default CreatorCard;
