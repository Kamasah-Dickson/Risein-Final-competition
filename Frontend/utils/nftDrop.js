import { ThirdwebSDK } from '@thirdweb-dev/sdk'

const sdk = new ThirdwebSDK('rinkeby')
const nftDrop = sdk.getNFTDrop(process.env.NEXT_PUBLIC_NFT_DROP_ADDRESS)

export { nftDrop }
