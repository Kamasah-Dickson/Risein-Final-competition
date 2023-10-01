export const getCreators = (nfts) => {
    const creators = nfts.reduce((creatorObject, nft) => {
        (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);

        return creatorObject;
    }, {});

    return Object.entries(creators).map((creator) => {
        const seller = creator[0];
        const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);

        return ({ seller, sum });
    });
};


// A useful function to create unique blockchain addresses.

export const makeId = (length) => {
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};


export const shortenAddress = (address) => (
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
);

export const shortenName = (name) => (
    `${name.slice(0, 14)}...`
);

export const shortenPrice = () => (
    'A lot of'
);

