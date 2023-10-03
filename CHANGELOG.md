# Changelog

All notable changes to the Sorare GraphQL API will be documented in this file. We reserve the right to remove deprecated fields after they've been deprecated for more than 1 month.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## 2023-10-03

Deprecation of the following fields:

- `offer.priceWei` (prefer using `offer.senderSide.amounts` and `offer.receiverSide.amounts` instead)
- `offer.priceFiat` (prefer using `offer.senderSide.amounts` and `offer.receiverSide.amounts` instead)

## 2023-09-28

Deprecation of the following fields:

- `user.highlightedDeck` (prefer using `userSportProfile.highlightedDeck` instead)
- `deckInFormation` (no longer maintained)
- `football.deckInFormation` (no longer maintained)

## 2023-09-25

The GraphQL introspection has been disabled on deprecated API endpoints: https://api.sorare.com/graphql and https://api.sorare.com/sports/graphql

## 2023-09-12

Dropped several deprecated fields linked to legacy market

- `token.collectionName`: Use `collection`

- `config.walletUrl`
- `config.frontendAssetHost`

- `auctionNotification.auction`: Use `tokenAuction`
- `auctionNotification.bid`: Use `tokenBid`

- `bid.englishAuction`: Use `tokenAuction`

Dropped legacy subscriptions:

- `bundledAuctionWasUpdated`
- `publicMarketWasUpdated`

## 2023-09-11

Dropped several deprecated fields linked to legacy market

- `card.onSale`: Use `token` fields
- `card.openEnglishAuction`: Use `token` fields
- `card.liveSingleSaleOffer`: 'Use `Token.liveSingleSaleOffer`
- `card.myMintedSingleSaleOffer`: Use `Token.myMintedSingleSaleOffer`
- `card.liveSingleBuyOffers`: Use `Token.liveSingleBuyOffers`
- `card.latestEnglishAuction`: Use `Token.latestEnglishAuction`
- `card.canBuy`: Use `Token.tradeableStatus`
- `card.publicMinPrice`: Use `Token.publicMinPrice`
- `card.privateMinPrice`: Use `Token.privateMinPrice`

- `transferMarket`: Use `tokens`
- `englishAuction`: Use `tokens`.auction
- `bundledAuction`: Use `tokens`.auction
- `directOffers`: Use `tokenOffers`
- `pendingDirectOffersSent`: Use `pendingTokenOffersSent`
- `endedDirectOffersSent`: Use `endedTokenOffersSent`
- `pendingDirectOffersReceived`: Use `pendingTokenOffersReceived`
- `endedDirectOffersReceived`: Use `endedTokenOffersReceived`

- `user.buyingEnglishAuctions`: Use `buyingTokenAuctions`
- `user.englishAuctions`: Use `tokenAuctions`
- `user.wonEnglishAuctions`: Use `wonTokenAuctions`
- `user.lostEnglishAuctions`: Use `lostTokenAuctions`
- `user.liveSingleSaleOffers`: Use `liveSingleSaleTokenOffers`
- `user.paginatedLiveSingleSaleOffers`: Use `liveSingleSaleTokenOffers`
- `user.soldSingleSaleOffers`: Use `soldSingleSaleTokenOffers`
- `user.endedWithNoBuyersSingleSaleOffers`: Use `endedWithNoBuyerSingleSaleTokenOffers`
- `user.boughtSingleSaleOffers`: Use `boughtSingleSaleTokenOffers`
- `user.singleSaleOffers`: Use `singleSaleTokenOffers`
- `user.fastWithdrawal`: Use `prepareFastWithdrawal` mutation

- `auction.contentProvider`

## 2023-09-07

Introduce new `tokens` fields to easily iterate over all live offers, primary offers & auctions.

- `tokens.liveSingleSaleOffers` & `TokenOffer.updatedAt`
- `tokens.liveAuctions` & `TokenAuction.updatedAt`
- `tokens.livePrimaryOffers` & `TokenPrimaryOffer.updatedAt`

## 2023-09-06

The following fields are now required:

- `bid.settlementInfo`
- `bid.approvals`
- `acceptOffer.approvals`
- `createDirectOffer.approvals`
- `createSingleSaleOffer.approvals`

The following deprecated fields have been removed:

- `createSingleSaleOffer.starkSignatures`
- `createDirectOffer.starkSignatures`
- `acceptOffer.starkSignatures`
- `prepareAcceptOffer.dealId`
- `acceptOffer.blockchainId`
- `acceptOffer.conversionCreditId`
- `prepareBid.conversionCreditId`
- `bid.conversionCreditId`

Deprecated the following fields:

- `prepareBid.limitOrders`: use `authorizations`
- `prepareAcceptOffer.limitOrders`: use `authorizations`
- `prepareOffer.sendWeiAmount`: use `sendAmount`
- `prepareOffer.receiveWeiAmount`: use `receiveAmount`
- `createSingleSaleOffer.price`: use `receiveAmount`
- `createDirectOffer.sendWeiAmount`: use `sendAmount`
- `createDirectOffer.receiveWeiAmount`: use `receiveAmount`
- `createOrUpdateSinglyBuyOfferMinPrice.amount`: use `minPrice`

## 2023-07-26

The API to bid, create offers, and accept offers have been updated. See [README.md](./README.md) and [code examples](./examples) for details.

Deprecated the following fields:

- `prepareOffer.sendWeiAmount`: use `sendAmount`
- `prepareOffer.receiveWeiAmount`: use `receiveAmount`

- `createSingleSaleOffer.price`: use `receiveAmount`
- `createSingleSaleOffer.starkSignatures`: use `approvals`

- `createDirectOffer.sendWeiAmount`: use `sendAmount`
- `createDirectOffer.receiveWeiAmount`: use `receiveAmount`
- `createDirectOffer.starkSignatures`: use `approvals`

- `acceptOffer.starkSignatures`: use `approvals`

## 2023-07-19

Deprecated the following fields:

- `prepareBid.bidAmountWei`: use `amount`
- `prepareBid.conversionCreditId`: use `settlementInfo.conversionCreditId`
- `bid.conversionCreditId`: use `settlementInfo.conversionCreditId`
- `bid.starkSignatures`: use `approvals`

## 2023-07-10

Deprecated the following field:

- `currentUser.fastWithdrawal`: use `prepareFastWithdrawal` mutation

## 2023-06-30

Deprecated the following mutation:

- `createSingleBuyOffer`: use `createDirectOffer`

## 2023-06-27

### Deprecated

Deprecated the following fields:

- `currentUser.paginatedLiveSingleSaleOffers`: use `liveSingleSaleTokenOffers`
- `currentUser.soldSingleSaleOffers`: use `soldSingleSaleTokenOffers`
- `currentUser.endedWithNoBuyerSingleSaleOffers`: use `endedWithNoBuyerSingleSaleTokenOffers`
- `currentUser.boughtSingleSaleOffers`: use `boughtSingleSaleTokenOffers`
- `currentUser.singleSaleOffers`: use `singleSaleTokenOffers`
- `createSingleSaleOffer.offer`: use `tokenOffer`

## 2023-06-26

### Deprecated

Deprecated the following subscription types:

- `offerWasUpdated`: use `tokenOfferWasUpdated`

Deprecated the following fields:

- `acceptOffer.offer`: use `tokenOffer`
- `cancelOffer.offer`: use `tokenOffer`
- `createDirectOffer.offer`: use `tokenOffer`
- `createSingleBuyOffer.offer`: use `tokenOffer`
- `rejectOffer.offer`: use `tokenOffer`
- `offerNotification.offer`: use `tokenOffer`
- `currentUser.buyingEnglishAuctions`: use `buyingTokenAuctions`
- `currentUser.englishAuctions`: use `tokenAuctions`
- `currentUser.wonEnglishAuctions`: use `wonTokenAuctions`
- `currentUser.lostEnglishAuctions`: use `lostTokenAuctions`
- `bid.englishAuctions`: use `tokenAuction`

## 2023-06-21

### Deprecated

Deprecated the following fields:

- `payment.operation`: use `tokenOperation`
- `accountEntry.operation`: use `tokenOperation`

## 2023-06-20

### Deprecated

Deprecated the following subscription types:

- `bundledAuctionWasUpdated`: use `tokenAuctionWasUpdated`

Deprecated the following fields:

- `transferMarket`: use `tokens`
- `bundledAuction`: use `tokens.auction`
- `englishAuction`: use `tokens.auction`
- `auctionNotification.auction`: use `auctionNotification.tokenAuction`
- `auctionNotification.bid`: use `auctionNotification.tokenBid`
- `mutation.bid.bid`: use `mutation.bid.tokenBid`

## 2023-06-12

### New API endpoint

[https://api.sorare.com/federation/graphql](https://api.sorare.com/federation/graphql) is the new Sorare API endpoint. It's a federated superset of the existing API endpoints so all existing queries remain valid, just replace the URL in your application. You can use it for all queries, independently of the sport; for instance, you can now fetch NBA card prices in a single query:

```gql
query GetNBACardsPrices($slugs: [String!]!) {
  nbaCards(slugs: $slugs)
    token {
      latestEnglishAuction {
        bestBid {
          amount
          amountInFiat { eur gbp usd }
        }
      }
    }
  }
}
```

The playground is available at [https://api.sorare.com/federation/graphql/playground](https://api.sorare.com/federation/graphql/playground).

[https://api.sorare.com/graphql](https://api.sorare.com/graphql) and [https://api.sorare.com/sports/graphql](https://api.sorare.com/sports/graphql) are deprecated and will be shut down in a few months to let time for everyone to migrate.

## 2023-06-08

### Deprecated

Deprecated the following subscription types:

- `publicMarketWasUpdated`: use `tokenAuctionWasUpdated` or `tokenOfferWasUpdated` instead

## 2023-06-05

### Deprecated

Deprecated the following fields:

- `so5.cardCollection`: use `football.cardCollection`
- `so5.userCardCollection`: use `football.userCardCollection`

## 2023-06-01

### Changed

- `createDirectOfferInput.duration`: value now defaults to 86400 (1 day) if given a lower value

### Deprecated

Deprecated the following fields:

- `so5`: use `football.so5`
- `so5Reward`: use `football.so5.so5Reward`
- `so5Lineup`: use `football.so5.so5Lineup`
- `so5Appearance`: use `football.so5.so5Appearance`
- `so5League`: use `football.so5.so5League`
- `so5Leaderboard`: use `football.so5.so5Leaderboard`
- `so5Score`: use `football.so5.so5Score`
- `so5Ranking`: use `football.so5.so5Ranking`

## 2023-05-31

### Deprecated

Deprecated the following fields:

- `competition`: use `football.competition`
- `game`: use `football.game`
- `card`: use `football.card`
- `cardByBlockchainId`: use `football.cardByBlockchainId`
- `cardByAssetId`: use `football.cardByAssetId`
- `ethereumCards`: use `football.ethereumCards`
- `players`: use `football.players`
- `player`: use `football.player`
- `club`: use `football.club`
- `clubs`: use `football.clubs`
- `nationalTeam`: use `football.nationalTeam`
- `nationalTeams`: use `football.nationalTeams`
- `clubsReady`: use `football.clubsReady`
- `season`: use `football.season`
- `deckInFormation`: use `football.deckInFormation`
- `customDeck`: use `football.customDeck`
- `shopItems`: use `football.shopItems`
- `cards`: use `football.cards`
- `allCards`: use `football.allCards`

## 2023-05-22

Additional paginated fields are now accessible:

- `sportsUser.nbaCards`
- `sportsUser.baseballCards`
- `NBAPlayer.cards`
- `BaseballPlayer.cards`

## 2023-05-17

Removed the following deprecated fields:

- `UserSettings.lastTcuVersionAccepted`

Deprecated the following field:

- `UserSettings.referrerPreferredRewardSport`: no longer used

## 2023-05-03

Removed the following deprecated field:

- `Card.priceRange`

## 2023-04-28

The following fields from the `Card` object are deprecated and should be replaced by their equivalent on the `Token` object:

- `onSale`
- `openEnglishAuction`: use `Token.latestEnglishAuction`
- `liveSingleSaleOffer`: use `Token.liveSingleSaleOffer`
- `myMintedSingleSaleOffer`: use `Token.myMintedSingleSaleOffer`
- `liveSingleBuyOffer`: use `Token.liveSingleBuyOffers`
- `latestEnglishAuction`: use `Token.latestEnglishAuction`
- `canBuy`: use `Token.tradeableStatus`
- `publicMinPrice`: use `Token.publicMinPrice`
- `privateMinPrice`: use `Token.privateMinPrice`

## 2023-04-11

Removed the following deprecated fields:

<details>
<summary>See the list</summary>

- `Account.oldId`: use id
- `Card.belongsToUser`
- `Card.canSell`
- `Card.cardEdition`
- `Card.cardPrint`: use cardEdition and layout instead
- `Card.club`: replaced by team
- `Card.currentSeasonBonus`: replaced by power breakdown
- `Card.gameForFixture`: use gameForLeague instead
- `Card.layout`
- `Card.license`
- `Card.nextVaultId`: not needed. This info is provided in prepare mutations
- `Card.owners`: use notContractOwners
- `Card.playerInjuries`
- `Card.price`: not relevant
- `Card.sameClubBonus`: replaced by power breakdown
- `Card.scoreForPreviousFixture`: use the So5Scores of the player instead
- `Card.teamPictureUrl`: use pictureUrl on team instead
- `Card.userOwnerWithRate`: replaced by ownerWithRate
- `Card.userOwners`: use notContractOwners
- `Card.userOwnersWithRate`: use notContractOwners
- `Card.vaultId`: not needed. This info is provided in prepare mutations
- `CardSubscription.belongsToUser`
- `CardSubscription.canSell`
- `CardSubscription.cardEdition`
- `CardSubscription.cardPrint`: use cardEdition and layout instead
- `CardSubscription.club`: replaced by team
- `CardSubscription.currentSeasonBonus`: replaced by power breakdown
- `CardSubscription.gameForFixture`: use gameForLeague instead
- `CardSubscription.layout`
- `CardSubscription.license`
- `CardSubscription.nextVaultId`: not needed. This info is provided in prepare mutations
- `CardSubscription.owners`: use notContractOwners
- `CardSubscription.playerInjuries`
- `CardSubscription.price`: not relevant
- `CardSubscription.sameClubBonus`: replaced by power breakdown
- `CardSubscription.scoreForPreviousFixture`: use the So5Scores of the player instead
- `CardSubscription.teamPictureUrl`: use pictureUrl on team instead
- `CardSubscription.userOwnerWithRate`: replaced by ownerWithRate
- `CardSubscription.userOwners`: use notContractOwners
- `CardSubscription.userOwnersWithRate`: use notContractOwners
- `CardSubscription.vaultId`: not needed. This info is provided in prepare mutations
- `Club.colorBottom`: replaced by colorRight on customBanner
- `Club.colorTop`: replaced by colorLeft on customBanner
- `Club.license`: only exposed on cards
- `Club.partner`: replaced by dataPartner
- `Club.pictureUrlByRarity`: replaced teamPictureUrl on CardType
- `Config.activateStarkware`
- `Config.cardPowerCap`
- `Config.cdnEnabled`
- `Config.draftMajorCompetitions`: draft does not exist anymore
- `Config.landingCards`: replaced by landingTheme
- `Config.nextSo5FixtureTeams`: moved to so5
- `Config.powerHourStartDate`: no longer maintained
- `Config.so5LeaguesAlgoliaFilters`: moved to so5
- `Config.transferMarketBanner`: moved to TransferMarketType
- `CurrentUser.allTimeBestDecksInFormation`: no longer maintained
- `Game.away`: replaced by awayTeam
- `Game.home`: replaced by homeTeam
- `Membership.team`: replaced by membershipTeam
- `NationalTeam.colorBottom`: replaced by colorRight on customBanner
- `NationalTeam.colorTop`: replaced by colorLeft on customBanner
- `NationalTeam.license`: only exposed on cards
- `NationalTeam.partner`: replaced by dataPartner
- `NationalTeam.pictureUrlByRarity`: replaced teamPictureUrl on CardType
- `Offer.receiveCardOffers`: use receiveCards instead
- `Offer.sendCardOffers`: use sendCards instead
- `Owner.dealId`: no longer maintained
- `Owner.migratorApproval`: use account.accountable.migratorApproved
- `Owner.newId`: use id
- `Owner.ownerable`: use account.owner instead
- `Owner.userNonce`: no longer maintained
- `OwnerInterface.dealId`: no longer maintained
- `OwnerInterface.migratorApproval`: use account.accountable.migratorApproved
- `OwnerInterface.newId`: use id
- `OwnerInterface.userNonce`: no longer maintained
- `OwnerWithRates.dealId`: no longer maintained
- `OwnerWithRates.migratorApproval`: use account.accountable.migratorApproved
- `OwnerWithRates.newId`: use id
- `OwnerWithRates.ownerable`: use account.owner instead
- `OwnerWithRates.userNonce`: no longer maintained
- `Player.position`: use the typed version instead: positionTyped
- `Player.tmktImageUrl`: replaced by pictureUrl(derivative: \"avatar\")
- `PlayerGameStats.club`: replaced by team
- `PlayerGameStats.gameStatus`: replaced by status on game field
- `PlayerGameStats.relevantStats`: not relevant with scoring V4
- `PublicUserInfoInterface.allTimeBestDecksInFormation`: no longer maintained
- `Query.bundledAuctions`: use transferMarket type instead
- `Query.cardEdition`: no longer maintained
- `Query.cardSamplePicture`: use screenshottableCard
- `Query.clubShopItems`: use shopItems
- `Query.currentSo5Fixture`: use default value of so5Fixture
- `Query.pack`: no longer maintained
- `Query.packs`: no longer maintained
- `Query.singleSaleOffers`: use transferMarket type instead
- `Query.so5Fixtures`: moved into so5
- `So5Appearance.score`: use score under so5Score
- `So5Appearance.so5Game`: no longer maintained
- `So5Fixture.appearancesInFixtureInterval`: can be found with mySo5Lineups
- `So5Fixture.commonDraftCampaignSo5Leaderboard`: no longer maintained
- `So5Fixture.myRecommendedSo5Leaderboards`: use sorted leaderboards instead
- `So5Fixture.so5Rewards`: use leaderboard rewards instead
- `So5Leaderboard.name`: replaced by title
- `So5Leaderboard.rewards`: replaced by rewardsConfig
- `So5Leaderboard.scoringEngine`: replaced by engineConfiguration
- `So5Leaderboard.shieldName`: not in use anymore
- `So5Leaderboard.so5Lineups`: use so5LineupsPaginated instead
- `So5League.description`: no longer maintained
- `So5Lineup.score`: use so5Rankings.score
- `So5Reward.cards`: replaced by rewardCards
- `So5Reward.ranking`: replaced by so5Ranking
- `So5Rules.averageScorePlayersCount`: no longer maintained
- `So5Rules.clubs`: no longer maintained
- `So5Rules.maxAge`: replaced by age
- `So5Rules.minAge`: replaced by age
- `So5Rules.sameClub`: no longer maintained
- `So5UserGroup.commonDraftCampaignSo5Leaderboard`: no longer maintained
- `Subscription.packWasSold`: not used anymore
- `TeamInterface.colorBottom`: replaced by colorRight on customBanner
- `TeamInterface.colorTop`: replaced by colorLeft on customBanner
- `TeamInterface.license`: only exposed on cards
- `TeamInterface.partner`: replaced by dataPartner
- `TeamInterface.pictureUrlByRarity`: replaced teamPictureUrl on CardType
- `Token.latestOwner`
- `TransferMarket.banners`: use ConfigType.heroBanners
- `TransferMarket.bundlesFirst`
- `TransferMarket.secondaryBanners`: use ConfigType.banners
- `User.allTimeBestDecksInFormation`: no longer maintained
- `UserOwner.dealId`: no longer maintained
- `UserOwner.migratorApproval`: use account.accountable.migratorApproved
- `UserOwner.newId`: use id
- `UserOwner.userNonce`: no longer maintained
- `UserWithSubscriptionSlug.allTimeBestDecksInFormation`: no longer maintained
</details>

## 2023-03-24

### Removed

Removed the following values from the `TradableStatus` which were no longer emitted:

- `INTERNAL`
- `MAPPED`
- `ON_SALE`

## 2023-02-17

### Removed

Removed the following queries from the Sports API:

- `user`

## 2023-02-13

### Deprecated

Deprecated the following `currentUser` fields:

- `directOffers`: use `tokenOffers`
- `pendingDirectOffersSent`: use `pendingTokenOffersSent`
- `endedDirectOffersSent`: use `endedTokenOffersSent`
- `pendingDirectOffersReceived`: use `pendingTokenOffersReceived`
- `endedDirectOffersReceived`: use `endedTokenOffersReceived`

## 2023-02-10

### Removed

Removed the following queries from the Sports API:

- `card`
- `cards`
- `player`
- `lineup`

Removed the following mutations from the Sports API:

- `completeOnboardingTask`
- `createOrUpdateLineup`

## 2023-02-08

### Deprecated

Deprecated the following queries from the Sports API:

- `user`: use `sportsUser`

## 2023-02-02

### Deprecated

Deprecated the following queries from the Sports API:

- `currentNBAUser`: use `currentSportsUser`

### Removed

Removed the following deprecated fields from the Sports API:

- `NBACompleteOnboardingTaskResponse.currentUser`
- `BaseballCompleteOnboardingTaskResponse.currentUser`

## 2023-01-28

### Deprecated

Deprecated the following mutations from the Sports API:

- `createOrUpdateLineup`: use `createOrUpdateBaseballLineup`
- `deleteLineup`: use `deleteBaseballLineup`

## 2023-01-26

### Deprecated

Deprecated the following queries from the Sports API:

- `lineup`: use `baseballLineup`
- `completeOnboardingTask`: use `completeBaseballOnboardingTask`
- `cards`: use `baseballCards`

### Removed

Removed the following deprecated queries from the Sports API:

- `currentUser`
- `fixture`
- `leaderboard`
- `liveFixture`
- `openFixture`
- `pastFixtures`
- `team`

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
