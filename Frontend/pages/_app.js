import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

import { Navbar, Footer } from '../components';

import { NFTProvider } from '../context/NFTContext';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
    <NFTProvider>
        <ThemeProvider attribute="class">
            <div className="dark:bg-nft-dark bg-white min-h-screen">
                <Head>
                    <title>Polyplace</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Navbar />
                <div className="pt-65">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>

            <Script src="https://kit.fontawesome.com/77a74156e4.js" crossOrigin="anonymous" />
        </ThemeProvider>
    </NFTProvider>
);

export default MyApp;
