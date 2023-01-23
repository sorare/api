# Changelog

All notable changes to the Sorare GraphQL API will be documented in this file. We reserve the right to remove deprecated fields after they've been deprecated for more than 1 month.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## 2023-01-16

### Deprecated

Deprecated the following field from `prepareOffer`:

- `cardSlug`: use `assetId`

Deprecated the following field from `createOrUpdateSingleBuyOfferMinPrice`:

- `cardSlug`: use `assetId`

## 2023-01-12

### Deprecated

Deprecated the following fields from `createDirectOffer`:

- `sendCardsSlugs`: use `sendAssetIds`
- `receiveCardsSlugs`: use `receiveAssetIds`

Deprecated the following fields from `createSingleSaleOffer`:

- `cardSlug`: use `assetId`

Deprecated the following fields from `createSingleBuyOffer`:

- `cardSlug`: use `assetId`

## 2023-01-10

### Changed

GraphQL complexity limits have been updated to reflect a change in the computation algorithm. Some array-based GraphQL fields were not accounted for and will now be taken into account (eg. `soScore.allAroundStats` or `englishAuction.cards`). The new algorithm computes GraphQL complexity that are generally higher than the old one so we have bumped the (authenticated) limit to 30k.

Clarified subscription complexity limits.

## 2022-12-13

### Changed

`currentUser.accountEntries` now returns entries related to market fees (where entry type is `PAYMENT_FEE`) and is also filterable on the `entryType` field.

## 2022-12-02

### Added

A query `tokenPrices` has been added. It returns the last 5 public prices (either from Auction or SingleSaleOffer) for a given player, rarity and collection.

## 2022-11-08

### Changed

- When creating a `SingleSaleOffer` through the `createSingleSaleOffer` mutation, the `start_date` now defaults to "2 minutes in the future" (instead of the current timestamp). This creates a grace period during which the offer can be canceled before it becomes public.

### Deprecated

Deprecated the following field from `So5Leaderboard`:

- `scoringEngine`

Deprecated the following field from `Card`:

- `priceRange` (use `Token.priceRange` instead, which works across collections)

## 2022-11-04

### BREAKING CHANGES

A `feeInfo` field of type `Fee` is added on `LimitOrder` type and is now mandatory on the following mutation when interacting with the secondary market:

- for direct offer creation: `prepareOffer` mutation.
- for single sale offer acceptance: `prepareAcceptOffer` mutation, see the [updated example](examples/acceptSingleSaleOffer.js).

This new `feeInfo` field must be part of the payload that will be signed with the `signLimitOrder` method
provided by the [`@sorare/crypto`](https://github.com/sorare/crypto) package or any other method you will use.

Please note that these changes are only required for offers containing MLB or NBA cards, and an ETH amount.

### Added

Added the following field on `Offer` and `SingleSaleOffer`:

- `marketFeeWeiAmount`

Added the following fields on `TokenOffer`:

- `marketFeeAmountWei`
- `marketFeeAmountFiat`

## 2022-10-18

### Removed

Removed the following deprecated fields from `Card`:

- `currentUserSingleBuyOfferMinPrice`
- `publicSingleBuyOfferMinPrice`

## 2022-10-13

### Added

Added the following argument on `PublicUserInfoInterface.paginatedCards` and `WithPublicCardsInterface.cards`:

- `ownedSinceAfter`

## 2022-10-07

### Added

Added the following arguments on `*.cards`:

- `teamSlugs`
- `playerSlugs`

## 2022-10-05

### Added

Added the following argument on `*.cards`:

- `customCardEditionName`

Added the following field on `So5RewardCardConfig`:

- `customCardEditionName`

### Deprecated

Deprecated the following root field

- `cardEdition`

Deprecated the following fields on `Card`

- `cardEdition`
- `layout`
- `license`

Deprecated the following fields on `So5RewardCardConfig`

- `cardEdition`

## 2022-09-22

### Added

Added the following argument on `PlayerGameStats.so5Score`:

- `position`

## 2022-08-05

### Deprecated

Deprecated the following field on `CurrentUser`

- `otpBackupCodes`

## 2022-07-19

Welcome **Sorare: MLB** GraphQL API!!

### Added

Added sport-agnostic GraphQL types:

- `Token`
- `TokenOffer`
- `TokenAuction`
- `TokenBid`

Added sport-agnostic GraphQL subscriptions:

- `tokenOfferWasUpdated`
- `tokenAuctionWasUpdated`

## 2022-07-13

### Removed

Removed the following deprecated field from `Card`:

- `mintedSingleSaleOffer`

## 2022-07-08

### Changed

The AccountType `id` format has been changed to an UUID. The old id format is exposed in a deprecated `oldId` field.

### Deprecated

Deprecated the following field on `Owner`

- `newId`

### Removed

Removed the following deprecated fields from `EnglishAuction`:

- `card`
- `name`
- `contract`
- `limitOrders`

Removed the following deprecated fields from `Account`:

- `escrowAccount`
- `sorareManaged`

Removed the following deprecated fields from `PaymentIntent`:

- `saveCard`

Removed the following deprecated fields from `SingleSaleOffer`:

- `belongsToUser`
- `actualReceiver`

## 2022-06-03

### Deprecated

Deprecated the following field from the `SignUp` mutation:

- `invitationToken` (no longer supported, now ignored)

## 2022-06-01

### Changed

Document complexity and depth limitations on GraphQL queries.

## 2022-05-23

### Removed

Removing the following field (deprecated on [2022-02-01](#2022-02-01)):

`UserProfile`:

- `slug`

## 2022-05-20

### Removed

Some deprecated auction and offer fiels have been removed

`Offer`:

- `minSignatureExpirationDate`
- `mintedAt`
- `receiverLimitOrders`
- `contract`
- `ethereumTransaction`

`Auction`:

- `minSignatureExpirationDate`
- `number`
- `belongsToUser`
- `bestBidBelongsToUser`

## 2022-05-19

### Removed

Some deprecated card and player fields have been removed:

`Card`:

- `cardSampleUrl`
- `draftValue`

`Player`:

- `releasedPlayerValues`

## 2022-05-09

### Removed

Deprecated market fields have been removed:

`Card`:

- `openAuction`
- `latestAuction`

`Country`:

- `openAuctions`

`Player`:

- `openAuctions`

`Team`:

- `openAuctions`

`User`:

- `cards`
- `allTimeBestDecks`
- `openAuctions`
- `openEnglishAuctions`
- `auctions`
- `wonAuctions`
- `lostAuctions`
- `endedBuyingAuctions`
- `buyingAuctions`

`Root`:

- `auctions`

`transferMarket`:

- `auctions`
- `bundledAuctions`

`englishAuction`:

- `deal`

`offer`:

- `deal`

## 2022-04-30

### Changed

- The `ids` argument to the `nodes` root field is now limited to only 100 elements.

### Deprecated

`Team`:

- `openAuctions`

## 2022-04-28

## Removed

All currentUser fields that were deprecated have been removed.

`CurrentUser`:

- `firstName`
- `lastName`
- `nextStarkwareNonce`
- `betaStarker`
- `remainingRookieGameWeeks`
- `blockedBy`
- `draftAvailableFunds`
- `frontChatUserHash`
- `directOffersSent`
- `directOffersReceived`
- `blocked`
- `subscriptions`
- `starkRegistrationSignature`

## 2022-04-14

## Added

- `aCardWasUpdated` now takes the optional `events` parameter to filter subscriptions

## 2022-04-06

## Added

`EthereumAccount`:

- `migratorApproved`

`Offer`:

- `sendCards`
- `receiveCards`

### Deprecated

`Account`:

- `escrowAccount`
- `sorareManaged`

`Offer`:

- `minSignatureExpirationDate`
- `contract`
- `ethereumTransaction`
- `sendCardOffers`
- `receiveCardOffers`

`EnglishAuction`:

- `contract`
- `minSignatureExpirationDate`
- `name`
- `limitOrders`

### Removed

`Offer`:

- `receiverLimitOrders`
- `deal`

## 2022-02-21

- Deprecate `CardPrint` and `RaritiesCardLayout` types (were only accessible through deprecated fields)
- Always return an empty object for `CardPrint.backgroundUrlByRarity`

### BREAKING CHANGES

- Remove `deck` root field (had been deprecated for a while)
- Force passing the `slugs` argument for the `cards` root field

## 2022-02-02

- `publicMarketWasUpdated` subscription has been introduced:. It triggers every time a card is updated on a public market (auction and single sale offers): on a bid, when an auction ends, when a single sale offer is accepted.

## 2022-02-01

- `slug` field is now deprecated on the `UserProfile` type. You should be using the `id` field instead.

- the `aCardWasUpdated` subscription now takes the following optional arguments to filter subscriptions:
  - `ages`
  - `cardEditions`
  - `playerSlugs`
  - `positions`
  - `owned`
  - `rarities`
  - `seasonStartYears`
  - `serialNumbers`
  - `shirtNumbers`
  - `slugs`

## 2022-01-17

- `cards` and `allCards` queries and connections can now take the following arguments:
  - `age`
  - `owned`
  - `positions`
  - `rarities`
  - `serialNumber`
  - `shirtNumber`
  - `slugs`
- added a new `season` query
- added a new `cardEdition` query

## 2022-01-14

- the `dealId` field is now part of `UserOwnerWithRates` object.

## 2022-01-10

- the `channelId` component of the WebSocket `actioncable-v1-json` sub-protocol is not required anymore.
- the `Origin` HTTP header is not required anymore while querying `wss://ws.sorare.com/cable`.

## 2022-01-07

- improved 404 error messages

## 2022-01-06

- whenever rate-limited, a `Retry-After` HTTP header will be added to the response to understand how much time to wait before retrying.

## 2022-01-05

### BREAKING CHANGES

Some high-cardinality sets of objects won't be retrievable while being nested in a collection/connection. (eg. you can retrieve the followers of a single User but won't be able to retrieve them on multiple users in a single GraphQL query). This applies to:

- user.followers
- user.following
- user.buyingEnglishAuctions
- user.paginatedLiveSingleSaleOffers
- user.endedWithNoBuyerSingleSaleOffers
- country.openAuctions
- user.customDecks
- team.openAuctions
- team.players
- team.activePlayers
- team.recentDepartures
- team.activeMemberships
- team.latestGames
- team.games
- card.playerSeasonPicture
- card.teamPictureUrl
- competition.clubs
- so5Fixture.so5Leagues
- so5Fixture.mySo5Lineups
- so5Fixture.mySo5Games
- so5Fixture.so5Leaderboards
- so5Fixture.mySo5Rewards
- so5Fixture.mySo5Rankings
- so5Fixture.orderedSo5Scores
- so5Fixture.orderedSo5ScoresByPosition
- so5Fixture.next
- so5Fixture.previous
- so5Leaderboard.so5Rankings
- so5Leaderboard.so5RankingsPreview
- so5Leaderboard.so5Rewards
- so5Leaderboard.so5LineupsPaginated
- so5Leaderboard.so5RankingsPaginated

### REMOVED

Some fields have been removed from the API. They have been marked as deprecated and you can still query them for now but the response will always be empty. This applies to:

- currentUser.subscriptions
- so5Leaderboard.so5Lineups
- so5Appearance.so5Game
- card.mintedSingleSaleOffer

### ADDED

Additional fields are now accessible to OAuth authenticated calls. This applies to:

- card.myMintedSingleSaleOffer
- card.currentUserSingleBuyOfferMinPrice
- card.liveSingleBuyOffers
- card.canBuy
- currentUser.followers
- currentUser.following
