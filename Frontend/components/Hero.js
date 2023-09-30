import { CheckIcon, ClockIcon } from '@heroicons/react/outline'
import Timeline from './Timeline'

const styles = {
    wrapper: 'flex w-full items-center justify-center pt-16 lg:pt-20',
    container: 'space-y-10',
    heroTitle: 'xl:pr-40 text-6xl font-bold',
    heroParagraph: 'xl:pr-40',
    heroCta: 'flex items-center space-x-10',
    mintButton: 'rounded-xl border border-gray-100 bg-transparent px-8 py-4 font-semibold text-gray-100 transition-all hover:bg-gray-100 hover:text-[#1d1d1d]',
}

const Hero = ({ mintNFT, claimedSupply, totalSupply, inAllowlist, nftPrice, claimPhases }) => {
    const timelines = claimPhases.map((phase) => {
        const now = new Date().getTime()
        const hasPast = now > phase.startTime

        return {
            ...phase,
            icon: hasPast ? CheckIcon : ClockIcon,
            iconBackground: hasPast ? 'bg-green-500' : 'bg-gray-400',
        }
    })

    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.heroTitle}>Bored Ape Yacht Club</h1>

                <p className={styles.heroParagraph}>
                    The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community
                    through roadmap activation. This project is not affiliated by the real Bored Ape Yacht Club. Before making a purchase, please do your own research and always invest money you can afford to lose.
                </p>

                <ul>
                    {timelines.map((timeline, index) => (
                        <Timeline key={index} index={index} timeline={timeline} isLastTimeline={timelines.length === index + 1} />
                    ))}
                </ul>

                <div className={styles.heroCta}>
                    {inAllowlist && (
                        <button onClick={mintNFT} className={styles.mintButton}>
                            Mint Your NFT ({nftPrice} ETH)
                        </button>
                    )}
                    <p>
                        {claimedSupply} / {totalSupply} claimed
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Hero
