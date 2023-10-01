import { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { NFTContext } from '../context/NFTContext';

import images from '../assets';

import Button from './Button';

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
    const generateLink = (i) => {
        switch (i) {
            case 0: return '/';
            case 1: return '/listed-nfts';
            case 2: return '/my-nfts';
            default:
                break;
        }
    };

    return (
        <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
            {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
                <li
                    key={i}
                    onClick={() => {
                        setActive(item);

                        if (isMobile) setIsOpen(false);
                    }}
                    className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 transition duration-500
        ${active === item
                            ? 'dark:text-white text-nft-black-1'
                            : 'dark:text-nft-gray-3 text-nft-gray-2'}
         `}
                >
                    <Link href={generateLink(i)}>{item}</Link>
                </li>
            ))}
        </ul>
    );
};

const ButtonGroup = ({ setActive, router, setIsOpen }) => {
    const { connectWallet, currentAccount } = useContext(NFTContext);

    return currentAccount ? (
        <Button
            btnName="Create"
            classStyles="mx-2 rounded-xl"
            handleClick={() => {
                setActive('');
                setIsOpen(false);

                router.push('/create-nft');
            }}
        />
    ) : (
        <Button
            btnName="Connect"
            classStyles="mx-2 rounded-xl"
            handleClick={connectWallet}
        />
    );
};

const checkActive = (active, setActive, router) => {
    switch (router.pathname) {
        case '/':
            if (active !== 'Explore NFTs') setActive('Explore NFTs');
            break;
        case '/listed-nfts':
            if (active !== 'Listed NFTs') setActive('Listed NFTs');
            break;
        case '/my-nfts':
            if (active !== 'My NFTs') setActive('My NFTs');
            break;
        case '/create-nft':
            setActive('');
            break;

        default:
            setActive('');
    }
};

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [active, setActive] = useState('Explore NFTs');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTheme('dark');
    }, []);

    useEffect(() => {
        checkActive(active, setActive, router);
    }, [router.pathname]);

    return (
        <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1 dark:shadow-md shadow-md">
            <div className="flex flex-1 flex-row justify-start">
                <Link href="/">
                    <div
                        className="flexCenter md:hidden cursor-pointer"
                        onClick={() => {
                            setActive('Explore NFTs');
                        }}
                    >
                        <Image src={images.logo02} objectFit="contain" width={40} height={40} alt="logo" />
                        <p className="dark:text-white text-nft-black-1 font-bold text-xl ml-1">Polyplace</p>
                    </div>
                </Link>
                <Link href="/">
                    <div
                        className="hidden md:flex cursor-pointer"
                        onClick={() => {
                            setActive('Explore NFTs');
                            setIsOpen(false);
                        }}
                    >
                        <Image src={images.logo02} objectFit="contain" width={40} height={40} alt="logomobile" />
                    </div>
                </Link>
            </div>
            <div className="flex flex-initial flex-row justify-end">
                <div className="flex items-center mr-4">
                    <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    />
                    <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label cursor-pointer">
                        <i className="fas fa-moon" />
                        <i className="fas fa-sun" />
                        <div className="w-3 h-3 absolute bg-white rounded-full ball" />
                    </label>
                </div>

                <div className="md:hidden flex">
                    <MenuItems active={active} setActive={setActive} />
                    <div className="ml-3">
                        <ButtonGroup setActive={setActive} router={router} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>

            <div className="hidden md:flex ml-2 cursor-pointer">
                {isOpen
                    ? (
                        <Image
                            src={images.cross}
                            objectFit="contain"
                            width={25}
                            height={25}
                            alt="close"
                            onClick={() => setIsOpen(false)}
                            className={theme === 'light' ? 'filter invert' : ''}
                        />
                    ) : (
                        <Image
                            src={images.menu}
                            objectFit="contain"
                            width={25}
                            height={25}
                            alt="menu"
                            onClick={() => setIsOpen(true)}
                            className={theme === 'light' ? 'filter invert' : ''}
                        />
                    )}

                {isOpen && (
                    <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
                        <div className="flex-1 p-4">
                            <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
                        </div>
                        <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 flex justify-center">
                            <ButtonGroup setActive={setActive} router={router} setIsOpen={setIsOpen} />
                        </div>
                    </div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
