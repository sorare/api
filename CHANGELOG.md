# Changelog

All notable changes to the Sorare GraphQL API will be documented in this file. We reserve the right to remove deprecated fields after they've been deprecated for more than 1 month.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## 2022-05-19

## Removed

Some deprecated card and player fields have been removed:

`Card`:

- `cardSampleUrl`
- `draftValue`

`Player`:

- `releasedPlayerValues`

## 2022-05-09

## Removed

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
