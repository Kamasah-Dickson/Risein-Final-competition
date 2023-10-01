import React from 'react';

const Banner = ({ name, childStyles, parentStyles }) => (
    <div className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient shadow-md ${parentStyles}`}>
        <p className={`font-bold text-white text-5xl font-poppins leading-70 ${childStyles}`}>{name}</p>
    </div>
);

export default Banner;
