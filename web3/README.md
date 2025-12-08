# Sorare Web3 Setup

## Player Cards

Player Cards are NFTs. They are minted on Solana. Due to the amount of NFTs that are minted on any given season we use [Metaplex Bubblegum v2](https://developers.metaplex.com/bubblegum-v2) compressed NFT standard. Each sport (football, NBA, MLB) has its own collection for every single season (e.g. [NBA 2025 collection](https://magiceden.io/marketplace/sorare_nba_2025)). The list of collections can be found in `./constants/solana.js`.

Sorare has deployed a Transfer Proxy program on Solana. This programs allows Sorare to transfer an NFT from one manager to another if, and only if, Sorare is able to provide a cryptographic signature from the NFT owner. This cryptographic signature has an expiry and can't be replayed. You can see how the signature is produced here: [solanaTokenTransfer.js](../examples/solanaTokenTransfer.js). This program has been audited by Halborn.
* Address [`Gz9o1yxV5kVfyC53fFu7StTVeetPZWa2sohzvxJiLxMP`](https://solscan.io/account/Gz9o1yxV5kVfyC53fFu7StTVeetPZWa2sohzvxJiLxMP)
* Authority `6U34EJ79yNBLyHUgMsPmQJag4fgKMfNxENZZQgio32cF`

### NFT name
Every Player Card has a unique name constructed from the card player, season, scarcity and serial number `player_short_name season scarcity serial_number` (ex K. Mbappé 25 R 48):
* player_short_name is unique across all players and built from the first name initial and the last name. It cannot exceed 19 characters. In case of collisions an integer is added to the name.
* season is represented as the last two digits of the season start year.
* scarcity is represented as the scarcity initials: Limited (L), Rare (R), Super Rare (SR), Unique (U) and Custom Series (CS).
* serial_number

### Tracking collections
Mints and transfers of Sorare collections can be tracked by monitoring `MintV2` and `TransferV2` events emitted by the Bubblegum program. Sorare uses quicknode streams to monitor events. You can find Sorare's stream filter in `./quicknodeFilters/collectionFilter.js`.


## Cryptocurrency

Sorare supports payment in ETH and SOL. ETH payments are settled on [Base chain](https://www.base.org/) and Ethereum Layer 2 while SOL payments are settled on [Solana](https://solana.com/).

On Sorare, managers may commit to a future payment for instance when bidding on an Engish auction or when making an offer for another manager's Player Card. In order to support commitments Sorare has deployed a Bank smart contracts on both Base chain and Solana.

The high level API of Bank is fairly simple:
* `deposit` allows a manager to deposit funds in the Bank under their address
* `exit` allows a manager to withdraw all funds from the Bank to any address
* `withdraw` allows Sorare to withdraw available funds of a manager to any address. It requires a cryptographic signature from the withdrawer.
* `transfer` allows Sorare to move funds between accounts within the Bank. It requires a cryptographic signature from the payer. You can see how signatures are produced in [baseBankTransfer.js](../examples/baseBankTransfer.js) and [solanaBankTransfer.js](../examples/solanaBankTransfer.js)

Our Bank contracts have been audited by Halborn and are verified on chain:
* Base chain Bank contract: [`0x7473899213aa6A3d321eCC2259F567EF1Af2acb8`](https://basescan.org/address/0x7473899213aa6A3d321eCC2259F567EF1Af2acb8)
* Solana Bank program:
  * Address [`8JbCYE7Zobe45cbbHZYKF87bbJQ54oCowuAbB9QzSUxh`](https://solscan.io/account/8JbCYE7Zobe45cbbHZYKF87bbJQ54oCowuAbB9QzSUxh)
  * Authority `6U34EJ79yNBLyHUgMsPmQJag4fgKMfNxENZZQgio32cF`