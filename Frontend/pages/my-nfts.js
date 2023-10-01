import { useState, useEffect, useContext } from 'react';

import Image from 'next/image';

import withTransition from '../components/withTransition';

import { NFTContext } from '../context/NFTContext';
import { Loader, NFTCard, Banner, SearchBar } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/index';

const MyNFTs = () => {
    const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSelect, setActiveSelect] = useState('Recently Added');

    useEffect(() => {
        fetchMyNFTsOrListedNFTs()
            .then((items) => {
                setNfts(items);
                setNftsCopy(items);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const sortedNfts = [...nfts];

        switch (activeSelect) {
            case 'Price (low to high)':
                setNfts(sortedNfts.sort((a, b) => a.price - b.price));
                break;
            case 'Price (high to low)':
                setNfts(sortedNfts.sort((a, b) => b.price - a.price));
                break;
            case 'Recently Added':
                setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
                break;
            default:
                setNfts(nfts);
                break;
        }
    }, [activeSelect]);

    if (isLoading) {
        return (
            <div className="flexStart min-h-screen">
                <Loader />
            </div>
        );
    }

    const onHandleSearch = (value) => {
        const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

        if (filteredNfts.length) {
            setNfts(filteredNfts);
        } else {
            setNfts(nftsCopy);
        }
    };

    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy);
        }
    };

    return (
        <div className="w-full flex justify-start items-center flex-col min-h-screen">
            <div className="w-full flexCenter flex-col">
                <Banner
                    name="Your creative NFT's section."
                    childStyles="text-center mb-4"
                    parentStyles="h-80 justify-center"

                />

                <div className="flexCenter flex-col -mt-20 z-0">
                    <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 dark:bg-nft-black-4 bg-white rounded-full">
                        <Image
                            src={images.creator1}
                            className="rounded-full object-cover"
                            objectFit="cover"
                        />
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{shortenAddress(currentAccount)}</p>
                </div>
            </div>

            {!isLoading && !nfts.length && !nftsCopy.length ? (
                <div className="flexCenter sm:p-4 p-16">
                    <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">No NFTs Owned!</h1>
                </div>
            ) : (
                <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
                    <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
                        <SearchBar
                            activeSelect={activeSelect}
                            setActiveSelect={setActiveSelect}
                            handleSearch={onHandleSearch}
                            clearSearch={onClearSearch}
                        />
                    </div>
                    <div className="mt-3 w-full flex flex-wrap">
                        {nfts.map((nft) => (
                            <NFTCard
                                key={nft.token}
                                nft={nft}
                                onProfilePage
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default withTransition(MyNFTs);
