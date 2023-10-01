import Image from 'next/image';

import images from '../assets';

const Loader = () => (
    <div className="flexCenter w-full my-4">
        <Image src={images.loader} alt="loader" width={100} objectFit="contain" />
    </div>
);

export default Loader;
