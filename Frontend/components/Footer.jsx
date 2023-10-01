import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import images from '../assets';
import Button from './Button';

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-5">
            <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
                <div className="flexStart flex-1 flex-col">
                    <div className="flexCenter">
                        <Link href="/">

                            <Image src={images.logo02} className='cursor-pointer' objectFit="contain" width={40} height={40} alt="logo" />
                        </Link>
                        <p className=" dark:text-white text-nft-dark font-semibold text-lg ml-1">Polyplace</p>
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">Get the latest updates</p>
                    <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-lg">
                        <input type="email" placeholder="Your Email" className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none" />
                        <div className="flex-initial">
                            <Button
                                btnName="Email me"
                                btnType="primary"
                                classStyles="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8 font-semibold">
                    <div>
                        <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">Polyplace</h2>
                        <ul className="font-poppins text-nft-black-1 dark:text-white">
                            <li className="mb-3">
                                <a href="https://mumbai.polygonscan.com/address/0xF5f6B924332C350E3Fcd3A50Fc94db822f0B760f" target="_blank" className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3 transition duration-300" rel="noreferrer">Smart Contract</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://github.com/chrisstef/polyplace#the-project" target="_blank" className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3 transition duration-300" rel="noreferrer">The Project</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://github.com/chrisstef/polyplace/blob/main/README.md#developers" target="_blank" className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3 transition duration-300" rel="noreferrer">Developers</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">Polygon</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-3">
                                <a href="https://polygon.technology/" target="_blank" className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3 transition duration-300" rel="noreferrer">Polygon Technology</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://mumbai.polygonscan.com/" target="_blank" className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3 transition duration-300" rel="noreferrer">Mumbai Explorer</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://mumbaifaucet.com/" target="_blank" className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3 transition duration-300" rel="noreferrer">Faucet</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
                <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7 mb-0">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">Polyplace Inc. All Rights Reserved.</p>
                    <div className="flex flex-row sm:mt-4">
                        <div className={`${theme === 'light' ? 'filter invert' : ''} space-x-6`}>
                            <a target="_blank" href="https://github.com/chrisstef" alt="github" rel="noreferrer">
                                <Image src={images.github} objectFit="contain" className="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition duration-500" width={24} height={24} alt="github" />
                            </a>
                            <a target="_blank" href="https://twitter.com/ChristosStefan4" alt="twitter" rel="noreferrer">
                                <Image src={images.twitter} objectFit="contain" className="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition duration-500" width={24} height={24} alt="twitter" />
                            </a>
                            <a target="_blank" href="https://t.me/kaieverdream" alt="telegram" rel="noreferrer">
                                <Image src={images.telegram} objectFit="contain" className="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition duration-500" width={24} height={24} alt="telegram" />
                            </a>
                            <a target="_blank" href="https://www.youtube.com/channel/UCtOqEoFDiyw0usiJHE5ll_Q" alt="youtube" rel="noreferrer">
                                <Image src={images.youtube} objectFit="contain" className="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition duration-500" width={24} height={24} alt="youtube" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
