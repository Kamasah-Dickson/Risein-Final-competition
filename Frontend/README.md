# Polyplace

An open decentralized NFT Marketplace built with Solidity and Next.js, powered by Polygon Technologies. It basically is an open platform where users can mint and trade their own NFTs.

## Table of Contents

- [The Project](#the-project)
- [Developers](#developers)
- [Resources](#resources)

## The Project

An open platform where users can mint their own NFTs and list them on a Marketplace or buy NFTs from others. It includes:

- A smart contract which represents a collection of NFTs by following the ERC-721 standard.
- A smart contract which represents the NFT Marketplace and contains all the logic to make offers, execute offers...
- A Next.js front-end application as a user interface.

### Project details

Users can access the application via web-browser, and must have the Metamask wallet installed. The interface, built with Next.js, relies on the ethers.js library to communicate with the smart contracts through Metamask. This means that the data reflected on the front-end application is fetched from the Polygon blockchain. Each action performed by the user (mint an NFT, sell NFT, buy NFT...) creates a transaction on Polygon, which will require Metamask confirmation and a small fee, and this transaction will permanently modify the state of the NFTMarketplace smart contracts. On top of it, user's NFT Metadata will be uploaded to the IPFS, generating a hash which will be permanently recorded on the blockchain to prove ownership.

### Features

Users can perform the following actions on the NFT Marketplace:

#### Mint

Input a name, description and upload a file (image) to mint an NFT. Once minted, a representation of this NFT will be displayed in the marketplace and it will be owned by its creator. This is open for everyone, meaning everyone can participate in this NFT creation through this platform.

#### Buy NFT

A user can buy NFTs which someone else offered. This will require paying the requested price and a small fee.

#### Sell NFT

Users can sell their NFT by specifying its price (in MATIC). If someone fulfills this offer, then the NFT and its ownership is transferred to the new owner.

### Smart Contract Visualization

Below you can view the current's smart contract functions (and its interactions).

<p align="center">
<img src="/assets/NftViz.png" alt="SCV" title="Smart Contract Visualization">
</p>

## Developers

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Connect to BSC Testnet

First, it is required to install Metamask wallet browser extension: https://metamask.io/

Next, you need to configure Metamask to connect to the desired blockchain by using the following link: https://chainlist.org/ and add the network of your choice by simply connecting your wallet from a test address.

Run the following command in your terminal after cloning the main repo:

```shell
npm install
```

At this point you will be able to run the frontend with:

```shell
npm run dev
```

### Install & Run in Docker Environment

Before you begin, you'll need to have Docker installed on your machine. If you haven't already installed it, you can follow the installation instructions for your operating system on the official Docker website: https://docs.docker.com/get-docker/

To run the app in a Docker environment, follow these steps:

- Clone the repository to your local machine.
- Navigate to the root directory of the project in your terminal.
- Run the following command:

```sh
docker-compose up --force-recreate
```

The `docker-compose up --force-recreate` command starts the container defined in the `docker-compose.yml` file. The `--force-recreate` flag forces recreation of containers even if their configuration appears to be unchanged. This is useful when you want to make sure you are running the latest version of the container.

This command will start the container and map port `3000` on the container to port `3000` on your local machine. You can access the app by opening http://localhost:3000 in your web browser.

To stop the container, use `Ctrl + C` in your terminal and run the following command:

```sh
docker-compose down
```

### Run with Makefile (Optional)

`Makefile` provides convenient shortcuts for common tasks(docker instructions in our case). It is a way of automating software building procedure and other complex tasks with dependencies. Make sure you have `Makefile` installed and proceed with the following commands:

```shell
## Cleans, builds and runs the dapp on the DEVELOPMENT environment
make run-dev
```

```shell
## Cleans & recreates everything on the DEVELOPMENT environment
make recreate-dev
```

```shell
## Cleans the dapp from the DEVELOPMENT environment
make clean-dev
```

To see the list of all the available commands:

```shell
make help
```

## deployment

to deploy the sol code and verify it on etherscan please run

```bash

npm run deploy

```

That's it! You now have the `Next.js` app running in a Docker container. You can make changes to the app by modifying the files in the pages directory, and the changes will be automatically reflected in the running container.

### Smart Contract development

Make sure to go through the official Docs: https://hardhat.org/hardhat-runner/docs/getting-started#overview.

Initialize hardhat by running the following command:

```
npx hardhat
```

First, you will have to set up a local network by running the following command:

```
npx hardhat node
```

After you are happy with your changes in `NFTMarketplace.sol` file, compile the smart contract:

```
npx hardhat compile
```

### Deployment on Local Blockchain

Deploy the contracts on your local hardhat network by running the following command:

```
npx hardhat run scripts/deploy.js --network localhost
```

If all goes well, a new smart contract address refering the NFT Marketplace will be generated. Paste this address in the `constants.js` file.

Next, remove the argument provided in the `JsonRpcProvider` which is located in the **line 111** of the `NFTContext.js` file.

Finally, run the frontend on a new terminal to open the User Interface:

```
npm run dev
```

A local instance of Polyplace will be up and running on your local environment.

### Tech stack

- `Solidity`
- `Next.js`
- `hardhat`
- `ethers.js`
- `node.js`
- `Metamask`
- `IPFS`
- `Infura`
- `Alchemy`

### Future Ideas

- Clear deploy on Polygon Mainnet.
- Auction features.
- Bulk upload of NFTs as collections.
- Creator details page.

## Resources

- [polygon.technology](https://polygon.technology/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.15/)
- [node.js](https://nodejs.org/)
- [ethers.js](https://docs.ethers.io/v5/)
- [next.js](https://nextjs.org/)
- [IPFS](https://ipfs.io/)
- [Infura](https://infura.io/)
- [Alchemy](https://www.alchemy.com/)
- [Vercel](https://vercel.com/docs)
