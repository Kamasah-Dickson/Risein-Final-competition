import { useState, useEffect } from 'react'
import { useAddress, useMetamask, useDisconnect, useNFTDrop } from '@thirdweb-dev/react'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import NFTDisplay from '../components/NFTDisplay'
import Hero from '../components/Hero'
import Loading from '../components/Loading'
import { useAllowlist } from '../utils/allowlist'
import useFetcher from '../utils/fetch'

const styles = {
    wrapper: 'flex min-h-screen bg-[#1d1d1d] text-gray-200',
    container: 'flex flex-col lg:flex-row flex-1 p-5 pb-20 lg:p-10 space-y-10 lg:space-y-0',
    infoSection: 'lg:w-2/3 px-10',
    mobileDisplaySection: 'h-[300px] flex w-full lg:hidden lg:w-1/3 mt-4',
    desktopDisplaySection: 'hidden lg:flex flex-1 lg:w-1/3',
}

const Home = () => {
    const address = useAddress()
    const connectWithMetamask = useMetamask()
    const disconnect = useDisconnect()
    const isAdmin = address === process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
    const allowlist = useAllowlist()
    const fetcher = useFetcher()
    const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_NFT_DROP_ADDRESS)

    const [inAllowlist, setInAllowlist] = useState([])
    const [loading, setLoading] = useState(false)
    const [claimedSupply, setClaimedSupply] = useState(0)
    const [totalSupply, setTotalSupply] = useState(0)
    const [nftPrice, setNFTPrice] = useState(0)
    const [claimPhases, setClaimPhases] = useState([])

    useEffect(() => {
        if (!address) return

        const checkAllowlist = async () => {
            setLoading(true)

            try {
                const inAllowlist = await allowlist.check(address)
                setInAllowlist(inAllowlist)
            } catch (error) {
                console.log(error)
            }
        }

        checkAllowlist()
    }, [address])

    const joinAllowlist = async () => {
        setLoading(true)

        try {
            const success = await allowlist.join(address)

            if (success) setInAllowlist(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const downloadAllowlist = async () => {
        setLoading(true)

        try {
            await allowlist.download()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!address) return

        const getNFTDropDetails = async () => {
            try {
                const { claimedSupply, totalSupply, nftPrice, claimPhases } = await fetcher.get('/api/get-nft-drop')

                setClaimedSupply(claimedSupply)
                setTotalSupply(totalSupply)
                setNFTPrice(nftPrice)
                setClaimPhases(claimPhases)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getNFTDropDetails()
    }, [address])

    const mintNFT = async () => {
        if (!nftDrop) return

        setLoading(true)
        try {
            const quantity = 1
            const transaction = await nftDrop.claimTo(address, quantity)

            const claimedNFT = transaction[0]
            if (claimedNFT) await allowlist.update(address)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {address ? (
                <div className={styles.wrapper}>
                    <Head>
                        <title>Home | NFT Drop</title>
                    </Head>

                    {loading && <Loading />}

                    <div className={styles.container}>
                        <section className={styles.infoSection}>
                            <Header logout={disconnect} isAdmin={isAdmin} inAllowlist={inAllowlist} joinAllowlist={joinAllowlist} downloadAllowlist={downloadAllowlist} />

                            <div className={styles.mobileDisplaySection}>
                                <NFTDisplay />
                            </div>

                            <Hero claimPhases={claimPhases} inAllowlist={inAllowlist} mintNFT={mintNFT} claimedSupply={claimedSupply} totalSupply={totalSupply} nftPrice={nftPrice} />
                        </section>

                        <section className={styles.desktopDisplaySection}>
                            <NFTDisplay />
                        </section>
                    </div>
                </div>
            ) : (
                <Login login={connectWithMetamask} />
            )}
        </>
    )
}

export default Home
