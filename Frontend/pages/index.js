import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { NFTContext } from '../context/NFTContext';

import { Banner, CreatorCard, Loader, NFTCard, SearchBar, withTransition } from '../components';

import images from '../assets';
import { getCreators } from '../utils/index';
import { shortenAddress } from '../utils/index';

const Home = () => {
    const { fetchNFTs } = useContext(NFTContext);
    const [hideButtons, setHideButtons] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);
    const { theme } = useTheme();
    const [activeSelect, setActiveSelect] = useState('Recently Added');
    const [isLoading, setIsLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const parentRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetchNFTs()
            .then((items) => {
                const finalitems = items.filter((v) => v !== null);
                setNfts(finalitems);
                setNftsCopy(finalitems);
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

    const handleScroll = (direction) => {
        const { current } = scrollRef;

        const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };

    const isScrollable = () => {
        const { current } = scrollRef;
        const { current: parent } = parentRef;

        if (current?.scrollWidth >= parent?.offsetWidth) {
            setHideButtons(false);
        } else {
            setHideButtons(true);
        }
    };

    useEffect(() => {
        isScrollable();

        window.addEventListener('resize', isScrollable);

        return () => {
            window.removeEventListener('resize', isScrollable);
        };
    });

    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.scrollY > 1000 ? setShowScrollButton(true) : setShowScrollButton(false);
        };

        window.addEventListener('scroll', handleScrollButtonVisibility);

        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility);
        };
    });

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const topCreators = getCreators(nftsCopy);

    return (

        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-full minmd:w-4/5">
                <Banner
                    name="Own a piece of the digital revolution with unique NFT collectibles."
                    childStyles="md:text-3xl sm:text-2xl xs:text-xl text-center"
                    parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
                />

                {!isLoading && !nfts.length ? (
                    <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">The marketplace is empty.</h1>
                ) : isLoading ? <Loader /> : (
                    <>
                        <div>
                            <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                                ⭐ Top Creators
                            </h1>
                            <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
                                <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
                                    {topCreators.map((creator, i) => (
                                        <CreatorCard
                                            key={creator.seller}
                                            rank={i + 1}
                                            creatorImage={images[`creator${i + 1}`]}
                                            creatorName={shortenAddress(creator.seller)}
                                            creatorEths={creator.sum}
                                        />
                                    ))}
                                    {!hideButtons && (
                                        <>
                                            <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0">
                                                <Image
                                                    src={images.left}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    alt="left_arrow"
                                                    className={theme === 'light' ? 'filter invert' : ''}
                                                />
                                            </div>
                                            <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0">
                                                <Image
                                                    src={images.right}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    alt="right_arrow"
                                                    className={theme === 'light' ? 'filter invert' : ''}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">🔥 Hot NFTs</h1>
                                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                                    <SearchBar
                                        activeSelect={activeSelect}
                                        setActiveSelect={setActiveSelect}
                                        handleSearch={onHandleSearch}
                                        clearSearch={onClearSearch}
                                    />
                                </div>
                            </div>
                            {showMore ? (
                                <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                                    {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
                                </div>
                            ) : (
                                <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                                    {nfts.slice(0, 12).map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
                                </div>
                            )}
                            {!showMore && (
                                <div className="flex justify-center mt-4">
                                    <button btnName="Show more" className="mx-2 rounded-xl border border-nft-red-violet text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-nft-black-1 dark:text-white transition duration-500 hover:bg-nft-red-violet hover:shadow-md" onClick={() => setShowMore(true)}>Show More</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            {
                showScrollButton && (

                    <button
                        type="button"
                        className='fixed bottom-12 right-8 z-50 w-12 h-12 cursor-pointer p-2 nft-gradient shadow-lg
                                rounded-full focus:ring-purple-500 ring-opacity-0 inline-flex items-center hover:shadow-2xl
                                focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition duration-500'
                        onClick={handleScrollToTop}>
                        <Image
                            src={images.up}
                            width={40}
                            height={40}
                            alt="top_arrow"
                            className={theme === 'light' ? 'filter invert' : ''}
                        />

                    </button>
                )
            }
        </div>

    );
};

export default withTransition(Home);
