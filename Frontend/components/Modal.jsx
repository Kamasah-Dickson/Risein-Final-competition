import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';

const Modal = ({ header, body, footer, handleClose }) => {
    const modalRef = useRef(null);
    const { theme } = useTheme();

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    };

    return (
        <div className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn" onClick={handleClickOutside}>
            <div ref={modalRef} className="w-2/5 md:w-11/12 minlg:w-2/4 dark:bg-nft-dark bg-white flex flex-col rounded-lg">
                <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
                    <div className="relative w-3 h-3 minlg:w-6 minlg:h-6 cursor-pointer" onClick={handleClose}>
                        <Image src={images.cross} layout="fill" className={theme === 'light' ? 'filter invert' : ''} />
                    </div>
                </div>
                <div className="flexCenter w-full text-center p-4">
                    <h2 className="font-poppins dark:text-white text-nft-black-1 font-normal">{header}</h2>
                </div>
                <div className="p-10 sm:px-4 border-t border-b dark:border-nft-black-3 border-nft-gray-1">
                    {body}
                </div>
                <div className="flexCenter p-4">
                    {footer}
                </div>
            </div>
        </div>
    );
};

export default Modal;
