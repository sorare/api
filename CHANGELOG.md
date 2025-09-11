# Changelog

All notable changes to the Sorare GraphQL API will be documented in this file. We reserve the right to remove deprecated fields after they've been deprecated for more than 1 month.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## 2025-09-11

Starting nex week, `prepareOffer` mutation will require a new mandatory argument `receiverSlug` that is the receiver of the offer.

## 2025-03-14

Starting next week, `AnyPlayerInterface.anyCards` and `TeamInterface.anyCards` will return common cards.
If you are using them, you can include a `rarities` filter to explicitly exclude common cards.

## 2025-02-13

GraphQL introspection has been disabled. To download the GraphQL schema, you can now use the following HTTP endpoint:

```bash
$ curl -o schema.graphql https://api.sorare.com/graphql/schema
```

## 2024-10-11

A new subscription has been introduced. It gives access to all cards updates (not just football).
Updates can be filtered by sport.

✔ Field 'anyCardWasUpdated' was added to object type 'Subscription'
✔ Field 'Subscription.aCardWasUpdated' is deprecated
✔ Field 'Subscription.aCardWasUpdated' has deprecation reason 'Use any_card_was_updated instead'

## 2024-10-10

Many fields that had been deprecated for more than 3 months have been removed.
Some new deprecation have also been introduced.

⚠ Field 'openedSo5Lineup' (deprecated) was removed from object type 'BaseballCard'
⚠ Field 'openedSo5Lineup' (deprecated) was removed from object type 'Card'
⚠ Field 'card' (deprecated) was removed from object type 'CardCollectionCard'
⚠ Field 'card' (deprecated) was removed from object type 'CardCollectionNotification'
⚠ Field 'card' (deprecated) was removed from object type 'CardNotification'
⚠ Field 'openedSo5Lineup' (deprecated) was removed from object type 'CardSubscription'
⚠ Field 'autoPick' (deprecated) was removed from object type 'CommonDraftCampaign'
⚠ Field 'baseball' (deprecated) was removed from object type 'Counts'
⚠ Field 'football' (deprecated) was removed from object type 'Counts'
⚠ Field 'nba' (deprecated) was removed from object type 'Counts'
⚠ Field 'tokenFootball' (deprecated) was removed from object type 'Counts'
⚠ Field 'card' (deprecated) was removed from object type 'createCardWithdrawalPayload'
⚠ Field 'subscriptionStats' (deprecated) was removed from object type 'createSubscriptionPayload'
⚠ Field 'cardCounts' (deprecated) was removed from object type 'CurrentUser'
⚠ Field 'onboardingStatus' (deprecated) was removed from object type 'CurrentUser'
⚠ Field 'paginatedCards' (deprecated) was removed from object type 'CurrentUser'
⚠ Field 'topRecommendations' (deprecated) was removed from object type 'CurrentUser'
⚠ Field 'tokens' (deprecated) was removed from object type 'Deck'
⚠ Field 'subscriptionStats' (deprecated) was removed from object type 'deleteSubscriptionPayload'
⚠ Field 'postChallengeResultVideo' (deprecated) was removed from object type 'FootballRivalsChallenge'
⚠ Field 'socialPictureUrls' (deprecated) was removed from object type 'FootballRivalsChallenge'
⚠ Field 'friendlyChallengerSections' (deprecated) was removed from object type 'FootballRivalsConfig'
⚠ Field 'unlockedArenaTicketsDrop' (deprecated) was removed from object type 'FootballRivalsConfig'
⚠ Field 'eloDelta' (deprecated) was removed from object type 'FootballRivalsContestant'
⚠ Field 'aggregatedUnreadArenaStories' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'aggregatedUnreadArenaStoriesResults' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'completedOrReadyArenaStreakTask' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'division' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'eloGroup' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'eloScore' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'highestEloScore' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'highestScore' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'mostLossesAgainstOpponent' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'mostWinsAgainstOpponent' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'myUpcomingReceivedInvitesCount' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'nextArenaRequestAvailableAt' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'nextArenaTicketClaimableAt' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'nextUnreadArenaPostGameStories' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'nextUnreadArenaPostGameStory' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'nextUnreadBotFriendlyPostGameStory' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'readyArenaStreakTask' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'readyTask' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'records' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'remainingBetaInvites' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'unreadArenaPostGameStoriesCount' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'unreadArenaStories' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'unreadArenaStoriesCount' (deprecated) was removed from object type 'FootballRivalsCurrentManager'
⚠ Field 'division' (deprecated) was removed from object type 'FootballRivalsDivisionLeaderboardConfig'
⚠ Field 'managerCountConditionToRevealLeaderboard' (deprecated) was removed from object type 'FootballRivalsDivisionLeaderboardConfig'
⚠ Field 'probabilisticBundleConfig' (deprecated) was removed from object type 'FootballRivalsDivisionLeaderboardRankingReward'
⚠ Field 'lastFifteenAverageScore' (deprecated) was removed from object type 'FootballRivalsDraftableCard'
⚠ Field 'lastFifteenAverageScore' (deprecated) was removed from object type 'FootballRivalsDraftablePlayer'
⚠ Field 'eloDelta' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myEloDelta' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myFriendlyChallengesPaginated' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myInvite' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myInviteSocialPictureUrls' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myInvites' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myPostGameStoryState' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myPotentialEloDeltaLoss' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myPotentialEloDeltaWin' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'myReceivedInvites' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'mySentInvites' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'mySuggestedManagers' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'recommendedChallengers' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'recommendedChallengersForNewUsers' (deprecated) was removed from object type 'FootballRivalsGame'
⚠ Field 'completedOrReadyArenaStreakTask' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'division' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'eloGroup' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'eloScore' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'highestEloScore' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'highestScore' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'mostLossesAgainstOpponent' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'mostWinsAgainstOpponent' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'myUpcomingReceivedInvitesCount' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'readyArenaStreakTask' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'readyTask' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'records' (deprecated) was removed from object type 'FootballRivalsManager'
⚠ Field 'id' (deprecated) was removed from object type 'FootballRivalsRankingsPaginated'
⚠ Field 'myOnboardingFeaturedGames' (deprecated) was removed from object type 'FootballRivalsRoot'
⚠ Field 'myOngoingAndRecentGames' (deprecated) was removed from object type 'FootballRivalsRoot'
⚠ Field 'showBeta' (deprecated) was removed from object type 'FootballRivalsRoot'
⚠ Field 'cardCollection' (deprecated) was removed from object type 'FootballRoot'
⚠ Field 'customDeck' (deprecated) was removed from object type 'FootballRoot'
⚠ Field 'shopItems' (deprecated) was removed from object type 'FootballRoot'
⚠ Field 'so5' (deprecated) was removed from object type 'FootballRoot'
⚠ Field 'userCardCollection' (deprecated) was removed from object type 'FootballRoot'
⚠ Field 'myIncompleteCardCollections' (deprecated) was removed from object type 'ForYouRoot'
⚠ Field 'status' (deprecated) was removed from object type 'Game'
⚠ Field 'baseballGame' (deprecated) was removed from object type 'GameOfBaseball'
⚠ Field 'autoPickDraft' (deprecated) was removed from object type 'Mutation'
⚠ Field 'claimCardDrop' (deprecated) was removed from object type 'Mutation'
⚠ Field 'completeOnboardingTask' (deprecated) was removed from object type 'Mutation'
⚠ Field 'declareFootballManagerTask' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsArenaTicketClaim' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsGameMarkArenaStoriesAsRead' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsGameMarkPostGameStoriesAsRead' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsGameMarkPostGameStoryAsRead' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsInviteAccept' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsInviteAcceptCode' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsInviteCreate' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsInviteReject' (deprecated) was removed from object type 'Mutation'
⚠ Field 'footballRivalsInvitesAccept' (deprecated) was removed from object type 'Mutation'
⚠ Field 'resumeOnboarding' (deprecated) was removed from object type 'Mutation'
⚠ Field 'skipOnboarding' (deprecated) was removed from object type 'Mutation'
⚠ Field 'startOnboarding' (deprecated) was removed from object type 'Mutation'
⚠ Field 'openedSo5Lineup' (deprecated) was removed from object type 'NBACard'
⚠ Field 'amount' (deprecated) was removed from object type 'PendingDeposit'
⚠ Field 'amountInFiat' (deprecated) was removed from object type 'PendingDeposit'
⚠ Field 'status' (deprecated) was removed from object type 'Player'
⚠ Field 'player' (deprecated) was removed from object type 'PlayerWithSupply'
⚠ Field 'card' (deprecated) was removed from object type 'ProbabilisticBundleSlotCardItem'
⚠ Field 'allCards' (deprecated) was removed from object type 'Query'
⚠ Field 'card' (deprecated) was removed from object type 'Query'
⚠ Field 'cardByAssetId' (deprecated) was removed from object type 'Query'
⚠ Field 'cardByBlockchainId' (deprecated) was removed from object type 'Query'
⚠ Field 'cards' (deprecated) was removed from object type 'Query'
⚠ Field 'club' (deprecated) was removed from object type 'Query'
⚠ Field 'clubs' (deprecated) was removed from object type 'Query'
⚠ Field 'clubsReady' (deprecated) was removed from object type 'Query'
⚠ Field 'competition' (deprecated) was removed from object type 'Query'
⚠ Field 'customDeck' (deprecated) was removed from object type 'Query'
⚠ Field 'featuredSo5Fixtures' (deprecated) was removed from object type 'Query'
⚠ Field 'game' (deprecated) was removed from object type 'Query'
⚠ Field 'leaguesOpenForGameStats' (deprecated) was removed from object type 'Query'
⚠ Field 'player' (deprecated) was removed from object type 'Query'
⚠ Field 'playerGameScore' (deprecated) was removed from object type 'Query'
⚠ Field 'players' (deprecated) was removed from object type 'Query'
⚠ Field 'so5Appearance' (deprecated) was removed from object type 'Query'
⚠ Field 'so5Fixture' (deprecated) was removed from object type 'Query'
⚠ Field 'so5Leaderboard' (deprecated) was removed from object type 'Query'
⚠ Field 'so5LeaderboardGroup' (deprecated) was removed from object type 'Query'
⚠ Field 'so5League' (deprecated) was removed from object type 'Query'
⚠ Field 'so5Lineup' (deprecated) was removed from object type 'Query'
⚠ Field 'so5Ranking' (deprecated) was removed from object type 'Query'
⚠ Field 'so5Reward' (deprecated) was removed from object type 'Query'
⚠ Field 'so5Score' (deprecated) was removed from object type 'Query'
⚠ Field 'subscriptionStats' (deprecated) was removed from object type 'Query'
⚠ Field 'Query.season' is no longer deprecated
⚠ Field 'id' (deprecated) was removed from object type 'ReferralPaginated'
⚠ Field 'desktopBgImageUrl' (deprecated) was removed from object type 'ReferralTile'
⚠ Field 'desktopVariationBgImageUrl' (deprecated) was removed from object type 'ReferralTile'
⚠ Field 'mobileBgImageUrl' (deprecated) was removed from object type 'ReferralTile'
⚠ Field 'mobileVariationBgImageUrl' (deprecated) was removed from object type 'ReferralTile'
⚠ Field 'titleImageUrl' (deprecated) was removed from object type 'ReferralTile'
⚠ Field 'card' (deprecated) was removed from object type 'RewardCard'
⚠ Field 'card' (deprecated) was removed from object type 'SaleNotification'
⚠ Field 'card' (deprecated) was removed from object type 'So5Appearance'
⚠ Field 'game' (deprecated) was removed from object type 'So5Appearance'
⚠ Field 'baseballTeamsPlayingNextGameWeeks' (deprecated) was removed from object type 'So5Config'
⚠ Field 'basketballTeamsPlayingNextGameWeeks' (deprecated) was removed from object type 'So5Config'
⚠ Field 'footballTeamsPlayingNextGameWeeks' (deprecated) was removed from object type 'So5Config'
⚠ Field 'managerHomeContentUnitsSets' (deprecated) was removed from object type 'So5Config'
⚠ Field 'noCardRouteEmail' (deprecated) was removed from object type 'So5Config'
⚠ Field 'so5LeaguesAlgoliaFilters' (deprecated) was removed from object type 'So5Config'
⚠ Field 'hashedSalt' (deprecated) was removed from object type 'So5Fixture'
⚠ Field 'salt' (deprecated) was removed from object type 'So5Fixture'
⚠ Field 'so5LineupsFromRestrictionGroup' (deprecated) was removed from object type 'So5Fixture'
⚠ Field 'bench' (deprecated) was removed from object type 'So5Leaderboard'
⚠ Field 'challenges' (deprecated) was removed from object type 'So5Leaderboard'
⚠ Field 'enabled' (deprecated) was removed from object type 'So5Leaderboard'
⚠ Field 'hasFeaturedStarterPacks' (deprecated) was removed from object type 'So5Leaderboard'
⚠ Field 'myEligibleCards' (deprecated) was removed from object type 'So5Leaderboard'
⚠ Field 'myFeaturedStarterPacks' (deprecated) was removed from object type 'So5Leaderboard'
⚠ Field 'mustVerifyPhoneNumber' (deprecated) was removed from object type 'So5League'
⚠ Field 'restrictionGroup' (deprecated) was removed from object type 'So5League'
⚠ Field 'card' (deprecated) was removed from object type 'So5LineupNotification'
⚠ Field 'id' (deprecated) was removed from object type 'So5RankingsPaginated'
⚠ Field 'cardEdition' (deprecated) was removed from object type 'So5RewardCardConfig'
⚠ Field 'cardCollection' (deprecated) was removed from object type 'So5Root'
⚠ Field 'liveStarterPacks' (deprecated) was removed from object type 'So5Root'
⚠ Field 'managerHomeContentUnitsSets' (deprecated) was removed from object type 'So5Root'
⚠ Field 'myPodiums' (deprecated) was removed from object type 'So5Root'
⚠ Field 'myPodiumsDetails' (deprecated) was removed from object type 'So5Root'
⚠ Field 'userCardCollection' (deprecated) was removed from object type 'So5Root'
⚠ Field 'id' (deprecated) was removed from object type 'So5UserGroupMembershipsPaginated'
⚠ Field 'displayName' (deprecated) was removed from object type 'So5UserGroupTournament'
⚠ Field 'division' (deprecated) was removed from object type 'So5UserGroupTournament'
⚠ Field 'so5LeaderboardType' (deprecated) was removed from object type 'So5UserGroupTournament'
⚠ Field 'tournamentType' (deprecated) was removed from object type 'So5UserGroupTournament'
⚠ Field 'card' (deprecated) was removed from object type 'StarkwareWithdrawal'
⚠ Field 'position' (deprecated) was removed from object type 'SwappablePlayer'
⚠ Field 'card' (deprecated) was removed from object type 'Token'
⚠ Field 'favorited' (deprecated) was removed from object type 'Token'
⚠ Field 'amount' (deprecated) was removed from object type 'TokenBid'
⚠ Field 'amountInFiat' (deprecated) was removed from object type 'TokenBid'
⚠ Field 'maximumAmountInFiat' (deprecated) was removed from object type 'TokenBid'
⚠ Field 'amount' (deprecated) was removed from object type 'TokenMyBid'
⚠ Field 'amountInFiat' (deprecated) was removed from object type 'TokenMyBid'
⚠ Field 'maximumAmountInFiat' (deprecated) was removed from object type 'TokenMyBid'
⚠ Field 'amount' (deprecated) was removed from object type 'TokenPrice'
⚠ Field 'amountInFiat' (deprecated) was removed from object type 'TokenPrice'
⚠ Field 'subscribable' (deprecated) was removed from object type 'updateSubscriptionPayload'
⚠ Field 'subscriptionStats' (deprecated) was removed from object type 'updateSubscriptionPayload'
⚠ Field 'cardCounts' (deprecated) was removed from object type 'User'
⚠ Field 'paginatedCards' (deprecated) was removed from object type 'User'
⚠ Field 'amount' (deprecated) was removed from object type 'UserAccountEntry'
⚠ Field 'amountInFiat' (deprecated) was removed from object type 'UserAccountEntry'
⚠ Field 'cardCounts' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠ Field 'paginatedCards' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠ Field 'openedSo5Lineup' (deprecated) was removed from interface 'AnyCardInterface'
⚠ Field 'lastFifteenAverageScore' (deprecated) was removed from interface 'FootballRivalsDraftableObjectInterface'
⚠ Field 'completedOrReadyArenaStreakTask' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'division' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'eloGroup' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'eloScore' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'highestEloScore' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'highestScore' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'mostLossesAgainstOpponent' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'mostWinsAgainstOpponent' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'myUpcomingReceivedInvitesCount' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'readyArenaStreakTask' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'readyTask' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'records' (deprecated) was removed from interface 'FootballRivalsPublicManagerInterface'
⚠ Field 'cardCounts' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠ Field 'paginatedCards' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠ Field 'onboardingStatus' (deprecated) was removed from interface 'So5CurrentUserInterface'

✔ Field 'FootballRivalsCurrentManager.arenaUnlocked' is deprecated
✔ Field 'FootballRivalsCurrentManager.arenaUnlocked' has deprecation reason 'Not used anymore'
✔ Field 'FootballRivalsManager.arenaUnlocked' is deprecated
✔ Field 'FootballRivalsManager.arenaUnlocked' has deprecation reason 'Not used anymore'
✔ Field 'FootballRoot.season' is deprecated
✔ Field 'FootballRoot.season' has deprecation reason 'Use season on root instead'
✔ Field 'Query.so5LeaderboardGroupInterface' is deprecated
✔ Field 'Query.so5LeaderboardGroupInterface' has deprecation reason 'Use so5.so5LeaderboardGroupInterface'
✔ Field 'UserOwner.ownerable' is deprecated
✔ Field 'UserOwner.ownerable' has deprecation reason 'Use account instead'
✔ Field 'FootballRivalsPublicManagerInterface.arenaUnlocked' is deprecated
✔ Field 'FootballRivalsPublicManagerInterface.arenaUnlocked' has deprecation reason 'Not used anymore'

## 2024-09-04

Introduce concurrent queries throttling: user will now be limited to 40 queries inflight at the same time.

## 2024-07-29

Many fields that had been deprecated for more than 3 months have been removed.
Some new deprecation have also been introduced.

✖️ Input field 'prepareBidInput.auctionId' changed type from 'String' to 'String!'

⚠️ Type 'addFavouriteClubsPayload' was removed
⚠️ Type 'Bid' was removed
⚠️ Type 'CardDrop' was removed
⚠️ Type 'claimAwardPayload' was removed
⚠️ Type 'CustomDeckConnection' was removed
⚠️ Type 'CustomDeckEdge' was removed
⚠️ Type 'LandingClub' was removed
⚠️ Type 'LandingTheme' was removed
⚠️ Type 'OnboardingTask' was removed
⚠️ Type 'refreshAwardPayload' was removed
⚠️ Type 'So5TrophiesSummary' was removed
⚠️ Type 'UserSportProfile' was removed
⚠️ Type 'OnboardingStepEnum' was removed
⚠️ Type 'OnboardingTaskState' was removed
⚠️ Type 'ReminderStatus' was removed
⚠️ Type 'SkinShopItemNature' was removed
⚠️ Type 'State' was removed
⚠️ Type 'addFavouriteClubsInput' was removed
⚠️ Type 'claimAwardInput' was removed
⚠️ Type 'refreshAwardInput' was removed
⚠️ Field 'tokens' (deprecated) was removed from object type 'addTokensToDeckPayload'
⚠️ Field 'accounts' (deprecated) was removed from object type 'AnonymousUser'
⚠️ Field 'starkKeyRegistered' (deprecated) was removed from object type 'AnonymousUser'
⚠️ Field 'dueDate' (deprecated) was removed from object type 'AuctionReminder'
⚠️ Field 'status' (deprecated) was removed from object type 'AuctionReminder'
⚠️ Field 'token' (deprecated) was removed from object type 'BaseballCard'
⚠️ Field 'cardWithLivePrimaryOffer' (deprecated) was removed from object type 'BaseballPlayer'
⚠️ Field 'lowestPriceCard' (deprecated) was removed from object type 'BaseballPlayer'
⚠️ Field 'bid' (deprecated) was removed from object type 'bidPayload'
⚠️ Field 'owner' (deprecated) was removed from object type 'Card'
⚠️ Field 'ownerWithRates' (deprecated) was removed from object type 'Card'
⚠️ Field 'token' (deprecated) was removed from object type 'Card'
⚠️ Field 'complete' (deprecated) was removed from object type 'CardCollection'
⚠️ Field 'fulfilledSlotsCount' (deprecated) was removed from object type 'CardCollection'
⚠️ Field 'layerUrl' (deprecated) was removed from object type 'CardLayout'
⚠️ Field 'teamLogoUrl' (deprecated) was removed from object type 'CardLayout'
⚠️ Field 'token' (deprecated) was removed from object type 'CardNotification'
⚠️ Field 'owner' (deprecated) was removed from object type 'CardSubscription'
⚠️ Field 'ownerWithRates' (deprecated) was removed from object type 'CardSubscription'
⚠️ Field 'token' (deprecated) was removed from object type 'CardSubscription'
⚠️ Field 'card' (deprecated) was removed from object type 'ComposeTeamBenchCard'
⚠️ Field 'landingClubCount' (deprecated) was removed from object type 'Config'
⚠️ Field 'landingClubs' (deprecated) was removed from object type 'Config'
⚠️ Field 'landingTheme' (deprecated) was removed from object type 'Config'
⚠️ Field 'token' (deprecated) was removed from object type 'createCardWithdrawalPayload'
⚠️ Field 'token' (deprecated) was removed from object type 'createOrUpdateSingleBuyOfferMinPricePayload'
⚠️ Field 'accounts' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'availableConversionCredit' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'awards' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'baseballProfile' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'customDecks' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'disabled' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'footballProfile' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'headToHeadBetaTester' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'myFootballManagerTasks' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'mySorareAlgoliaKey' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'nbaProfile' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'otpBackupCodes' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'otpProvisioningUri' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'recoveryKitBalance' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'sportConversionCredit' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'starkKeyRegistered' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'trophiesSummary' (deprecated) was removed from object type 'CurrentUser'
⚠️ Field 'status' (deprecated) was removed from object type 'DeliverableItemOrder'
⚠️ Field 'subscribable' (deprecated) was removed from object type 'EmailSubscription'
⚠️ Field 'subscribableSlug' (deprecated) was removed from object type 'EmailSubscription'
⚠️ Field 'subscribableType' (deprecated) was removed from object type 'EmailSubscription'
⚠️ Field 'availableBalance' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'countryOfResidence' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'countryOfResidenceCode' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'depositBankAccount' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'dob' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'firstName' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'kycRefusedReason' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'kycStatus' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'lastName' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'nationality' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'nationalityCode' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'state' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'status' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'totalBalance' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'withdrawalBankAccounts' (deprecated) was removed from object type 'FiatWalletAccount'
⚠️ Field 'coinAmount' (deprecated) was removed from object type 'FootballManagerTask'
⚠️ Field 'unlocksArena' (deprecated) was removed from object type 'FootballManagerTask'
⚠️ Field 'division' (deprecated) was removed from object type 'FootballRivalsDivisionLeaderboard'
⚠️ Field 'inviteSocialPictureUrls' (deprecated) was removed from object type 'FootballRivalsLineup'
⚠️ Field 'aasmState' (deprecated) was removed from object type 'MangopayWithdrawal'
⚠️ Field 'addFavouriteClubs' (deprecated) was removed from object type 'Mutation'
⚠️ Field 'claimAward' (deprecated) was removed from object type 'Mutation'
⚠️ Field 'refreshAward' (deprecated) was removed from object type 'Mutation'
⚠️ Field 'token' (deprecated) was removed from object type 'NBACard'
⚠️ Field 'cardWithLivePrimaryOffer' (deprecated) was removed from object type 'NBAPlayer'
⚠️ Field 'lowestPriceCard' (deprecated) was removed from object type 'NBAPlayer'
⚠️ Field 'completed' (deprecated) was removed from object type 'Onboarding'
⚠️ Field 'enabled' (deprecated) was removed from object type 'Onboarding'
⚠️ Field 'skipped' (deprecated) was removed from object type 'Onboarding'
⚠️ Field 'specialEventCompleted' (deprecated) was removed from object type 'Onboarding'
⚠️ Field 'specialEventStarted' (deprecated) was removed from object type 'Onboarding'
⚠️ Field 'tasks' (deprecated) was removed from object type 'Onboarding'
⚠️ Field 'variant' (deprecated) was removed from object type 'Onboarding'
⚠️ Field 'Onboarding.id' is no longer deprecated
⚠️ Field 'amountInFiat' (deprecated) was removed from object type 'Payment'
⚠️ Field 'cardWithLivePrimaryOffer' (deprecated) was removed from object type 'Player'
⚠️ Field 'lowestPriceCard' (deprecated) was removed from object type 'Player'
⚠️ Field 'positionTyped' (deprecated) was removed from object type 'Player'
⚠️ Field 'cardWithLivePrimaryOffer' (deprecated) was removed from object type 'PlayerRecommendation'
⚠️ Field 'lowestPriceCard' (deprecated) was removed from object type 'PlayerRecommendation'
⚠️ Field 'refereeSportCardsBoughtAtAuctionCount' (deprecated) was removed from object type 'Referral'
⚠️ Field 'id' (deprecated) was removed from object type 'ReferralMilestoneReward'
⚠️ Field 'card' (deprecated) was removed from object type 'ReferralReward'
⚠️ Field 'token' (deprecated) was removed from object type 'ReferralReward'
⚠️ Field 'token' (deprecated) was removed from object type 'removeTokenFromDeckPayload'
⚠️ Field 'token' (deprecated) was removed from object type 'SaleNotification'
⚠️ Field 'position' (deprecated) was removed from object type 'ScreenshottableCard'
⚠️ Field 'token' (deprecated) was removed from object type 'setTokenTradeStatusPayload'
⚠️ Field 'nature' (deprecated) was removed from object type 'SkinShopItem'
⚠️ Field 'averageScore' (deprecated) was removed from object type 'So5Rules'
⚠️ Field 'availableBalance' (deprecated) was removed from object type 'StarkwareAccount'
⚠️ Field 'availableBalanceForWithdrawal' (deprecated) was removed from object type 'StarkwareAccount'
⚠️ Field 'totalBalance' (deprecated) was removed from object type 'StarkwareAccount'
⚠️ Field 'slug' (deprecated) was removed from object type 'StarterPack'
⚠️ Field 'player' (deprecated) was removed from object type 'Stats'
⚠️ Field 'cards' (deprecated) was removed from object type 'TokenAuction'
⚠️ Field 'nfts' (deprecated) was removed from object type 'TokenAuction'
⚠️ Field 'singleCivilYear' (deprecated) was removed from object type 'TokenBaseballMetadata'
⚠️ Field 'singleCivilYear' (deprecated) was removed from object type 'TokenFootballMetadata'
⚠️ Field 'cards' (deprecated) was removed from object type 'TokenOfferSide'
⚠️ Field 'fiat' (deprecated) was removed from object type 'TokenOfferSide'
⚠️ Field 'nfts' (deprecated) was removed from object type 'TokenOfferSide'
⚠️ Field 'price' (deprecated) was removed from object type 'TokenOwner'
⚠️ Field 'priceFiat' (deprecated) was removed from object type 'TokenOwner'
⚠️ Field 'priceWei' (deprecated) was removed from object type 'TokenOwner'
⚠️ Field 'referenceId' (deprecated) was removed from object type 'TokenOwner'
⚠️ Field 'token' (deprecated) was removed from object type 'TokenOwner'
⚠️ Field 'cards' (deprecated) was removed from object type 'TokenPrimaryOffer'
⚠️ Field 'nfts' (deprecated) was removed from object type 'TokenPrimaryOffer'
⚠️ Field 'priceFiat' (deprecated) was removed from object type 'TokenPrimaryOffer'
⚠️ Field 'priceWei' (deprecated) was removed from object type 'TokenPrimaryOffer'
⚠️ Field 'card' (deprecated) was removed from object type 'TokenRoot'
⚠️ Field 'cards' (deprecated) was removed from object type 'TokenRoot'
⚠️ Field 'nft' (deprecated) was removed from object type 'TokenRoot'
⚠️ Field 'nfts' (deprecated) was removed from object type 'TokenRoot'
⚠️ Field 'footballPlayer' (deprecated) was removed from object type 'TopGainers'
⚠️ Field 'lowestPriceCard' (deprecated) was removed from object type 'TopGainers'
⚠️ Field 'footballPlayer' (deprecated) was removed from object type 'TopVolume'
⚠️ Field 'accounts' (deprecated) was removed from object type 'User'
⚠️ Field 'awards' (deprecated) was removed from object type 'User'
⚠️ Field 'baseballProfile' (deprecated) was removed from object type 'User'
⚠️ Field 'customDecks' (deprecated) was removed from object type 'User'
⚠️ Field 'disabled' (deprecated) was removed from object type 'User'
⚠️ Field 'footballProfile' (deprecated) was removed from object type 'User'
⚠️ Field 'nbaProfile' (deprecated) was removed from object type 'User'
⚠️ Field 'starkKeyRegistered' (deprecated) was removed from object type 'User'
⚠️ Field 'trophiesSummary' (deprecated) was removed from object type 'User'
⚠️ Field 'proSince' (deprecated) was removed from object type 'UserProfile'
⚠️ Field 'rookie' (deprecated) was removed from object type 'UserProfile'
⚠️ Field 'enabledWallets' (deprecated) was removed from object type 'UserSettings'
⚠️ Field 'referrerPreferredRewardSport' (deprecated) was removed from object type 'UserSettings'
⚠️ Field 'accounts' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'awards' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'baseballProfile' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'customDecks' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'disabled' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'footballProfile' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'nbaProfile' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'starkKeyRegistered' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'trophiesSummary' (deprecated) was removed from object type 'UserWithSubscriptionSlug'
⚠️ Field 'token' (deprecated) was removed from interface 'AnyCardInterface'
⚠️ Field 'cardWithLivePrimaryOffer' (deprecated) was removed from interface 'AnyPlayerInterface'
⚠️ Field 'lowestPriceCard' (deprecated) was removed from interface 'AnyPlayerInterface'
⚠️ Field 'accounts' (deprecated) was removed from interface 'BlockchainUserInterface'
⚠️ Field 'starkKeyRegistered' (deprecated) was removed from interface 'BlockchainUserInterface'
⚠️ Field 'accounts' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'awards' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'baseballProfile' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'customDecks' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'disabled' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'footballProfile' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'nbaProfile' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'starkKeyRegistered' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'trophiesSummary' (deprecated) was removed from interface 'PublicUserInfoInterface'
⚠️ Field 'myFootballManagerTasks' (deprecated) was removed from interface 'So5CurrentUserInterface'
⚠️ Field 'singleCivilYear' (deprecated) was removed from interface 'TokenCardMetadataInterface'
⚠️ Enum value 'MOBILE' (deprecated) was removed from enum 'SignupPlatform'
⚠️ Enum value 'MAPPED' (deprecated) was removed from enum 'WalletStatus'

✔️ Field 'Card.availableCardBoosters' is deprecated
✔️ Field 'Card.availableCardBoosters' has deprecation reason 'Deprecated'
✔️ Deprecation reason on field 'Card.availableUserShopItems' has changed from 'Use availableCardBoosters' to 'Deprecated'
✔️ Field 'CardSubscription.availableCardBoosters' is deprecated
✔️ Field 'CardSubscription.availableCardBoosters' has deprecation reason 'Deprecated'
✔️ Deprecation reason on field 'CardSubscription.availableUserShopItems' has changed from 'Use availableCardBoosters' to 'Deprecated'
✔️ Deprecation reason was removed from field 'Onboarding.id'
✔️ Field 'Query.ethereumTokens' is deprecated
✔️ Field 'Query.ethereumTokens' has deprecation reason 'Use ethereumCards instead'
✔️ Field 'TokenRoot.allNfts' is deprecated
✔️ Field 'TokenRoot.allNfts' has deprecation reason 'Use allCards instead'
✔️ Field 'TopGainers.player' is deprecated
✔️ Field 'TopGainers.player' has deprecation reason 'Use anyPlayer instead'
✔️ Field 'TopVolume.player' is deprecated
✔️ Field 'TopVolume.player' has deprecation reason 'Use anyPlayer instead'

✔️ Field 'allCards' was added to object type 'TokenRoot'

## 2024-05-24

Most baseball related queries and mutations have been deprecatred in favor of using the same API as football. The same will happen to all NBA queries and mutations during the summer. The following queries and mutations have been deprecated.

### Queries

- `baseballCard` use `anyCard` instead
- `baseballCards` use `anyCards` instead
- `baseballFixture` use `so5Fixture` instead
- `baseballLeaderboard` access through `so5Fixture`
- `baseballLiveFixture` use `so5Fixture` instead
- `baseballOpenFixture` use `so5Fixture` instead
- `baseballPastFixtures` use `so5Fixtures` instead
- `baseballPlayer` use `anyPlayer` instead
- `baseballPlayers` use `anyPlayers` instead
- `baseballReferralRewards`
- `baseballTeam` use `team` instead
- `baseballLeague`
- `baseballLineup` use `so5Lineup` instead
- `baseballLineups` use `so5Lineups` instead
- `baseballStarterBundles`
- `baseballGame` use `anyGame` instead
- `baseballShop` use `shopItems` instead
- `baseballCumulativeLeaderboard`

### Mutations

- `claimBaseballRewards`
- `claimBaseballReferralRewards`
- `createBaseballLeague`
- `joinBaseballLeague`
- `leaveBaseballLeague`
- `createOrUpdateBaseballLineup`
- `deleteBaseballLineup`
- `buyBaseballShopItem`
- `claimBaseballCoinRewards`

## 2024-05-14

Removed the following field:

- `currentUser.jwtToken`, prefer using either explicit `createJwtToken` mutation or `jwtToken` field which can be found on any of the mutations you can use to sign in.

## 2024-03-08

Remove the following fields (previously deprecated):

- `nationalTeam` (use `football.nationalTeam` instead)
- `nationalTeams` (use `football.nationalTeams` instead)

## 2024-03-05

Deprecated the following field:

- `currentUser.jwtToken`, prefer using either explicit `createJwtToken` mutation or `jwtToken` field which can be found on any of the mutations you can use to sign in.

## 2024-02-22

The following deprecated types as well as their associated fields have been removed in favor of `CurrentUser`:

- `CurrentNBAUser`
- `CurrentSportsUser`

## 2023-12-20

Added `DIRECT_OFFER` accepted events to the set of events covered by the `tokenOfferWasUpdated` subscription.

## 2023-12-12

Limit the number of allowed `teamSlugs` within cards field arguments. Impacted fields include: `allCards`, `cards`, `paginatedCards`, `footballCards`, `football.cards`, `football.allCards`, `team.cards`, `player.cards`.

## 2023-11-17

Deprecated the following field:

- `user.customDecks` (use `user.footballUserProfile.decks` instead)

Dropped the following deprecated fields:

- `card.customDecks` (use `card.token.decks` instead)
- `cardSubscription.customDecks` (use `cardSubscription.token.decks` instead)

Dropped the following mutations:

- `addCardsToDeck` (use `addTokensToDeck` instead)
- `createCustomDeck` (use `createDeck` instead)
- `deleteCustomDeck` (use `deleteDeck` instead)
- `editCardInDeck` (support for ordering has been dropped)
- `editCustomDeck` (use `editDeck` instead)
- `removeCardFromDeck` (use `removeTokenFromDeck` instead)

## 2023-11-14

Deprecation of the following fields (these were actually deprecated on 10/31/23 but has not caught up in the document. Will keep the fields for at least 1 month from the documentation):

- `PrizePoolPodiumPrizeInterface.cardRarity` (use `PrizePoolPodiumPrizeInterface.cards` instead)
- `PrizePoolPodiumPrizeInterface.cardTier` (use `PrizePoolPodiumPrizeInterface.cards` instead)

## 2023-11-08

Deprecation of the following arguments:

- `prepareOffer.type`: Not replaced
- `prepareOffer.receiverSlug`: Not replaced

## 2023-11-06

Dropped the following deprecated fields:

- `user.highlightedDeck`: Use `userSportProfile.highlightedDeck`
- `deckInFormation`: no longer maintained
- `football.deckInFormation`: no longer maintained

## 2023-10-27

Starting from 10/30/2023, the `id` field of the `User` and `CurrentUser` types will always be returned with the following format: `User:<id>`. Before this date, the format was inconsistent between `<id>` and `User:<id>` depending on the query.

## 2023-10-17

Deprecated the following fields:

- `card.customDecks` (use `card.token.decks` instead)
- `cardSubscription.customDecks` (use `cardSubscription.token.decks` instead)

Deprecated the following mutations:

- `addCardsToDeck` (use `addTokensToDeck` instead)
- `createCustomDeck` (use `createDeck` instead)
- `deleteCustomDeck` (use `deleteDeck` instead)
- `editCardInDeck` (support for ordering will be dropped)
- `editCustomDeck` (use `editDeck` instead)
- `removeCardFromDeck` (use `removeTokenFromDeck` instead)

## 2023-10-09

Dropped the following deprecated fields:

- `transferMarket`: Use `tokens`

## 2023-10-06

Dropped the following deprecated fields:

- `offer.priceWei`
- `offer.priceFiat`

## 2023-10-03

Deprecation of the following fields:

- `offer.priceWei`: Use `offer.senderSide.amounts` and `offer.receiverSide.amounts`
- `offer.priceFiat`: Use `offer.senderSide.amounts` and `offer.receiverSide.amounts`

NOTE: when reading a MonetaryAmount field (such as `offer.receiverSide.amounts`), the object may not contain a value for each supported currencies. The `amounts.referenceCurrency` tells which currency is fixed.

## 2023-09-28

Deprecation of the following fields:

- `user.highlightedDeck`: Use `userSportProfile.highlightedDeck`
- `deckInFormation`: no longer maintained
- `football.deckInFormation`: no longer maintained

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
