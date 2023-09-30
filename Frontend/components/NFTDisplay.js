import Image from 'next/image'

const styles = {
    wrapper: 'bg-animate flex-1 rounded-3xl flex lg:flex-col items-center relative',
}

const NFTDisplay = () => {
    const nfts = ['/bayc-1.png', '/bayc-2.png', '/bayc-3.png', '/bayc-4.png', '/bayc-5.png', '/bayc-1.png', '/bayc-2.png', '/bayc-3.png', '/bayc-4.png', '/bayc-5.png']

    return (
        <div className={styles.wrapper}>
            <div className="absolute inset-0 flex snap-x items-center gap-4 overflow-x-scroll px-20">
                {nfts.map((nft, index) => (
                    <div key={index} className="relative h-[200px] w-[200px] flex-shrink-0 snap-center lg:h-[400px] lg:w-[400px]">
                        <Image src={nft} layout="fill" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NFTDisplay
