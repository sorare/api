<p align="center">
  <img src="logo.png">
</p>

> 📣🆕 [https://api.sorare.com/federation/graphql](https://api.sorare.com/federation/graphql) is the new Sorare API endpoint. It's a federated superset of existing API endpoints so all existing queries remain valid, just replace the URL in your application. Visit the [playground](https://api.sorare.com/federation/graphql/playground).

# Sorare API

At Sorare, we are committed to providing an open platform for developers to build upon.

While our Cards are stored on the Ethereum blockchain (or within a [Starkware rollup](https://starkware.co/starkex/)) we support an API that provides more detailed information.

The Sorare API are provided by [GraphQL](https://graphql.org/). Sorare provides a federated API for all sports. The API is hosted on [https://api.sorare.com/federation/graphql](https://api.sorare.com/federation/graphql). The documentation can be found under the Docs section of the [GraphQL playground](https://api.sorare.com/federation/graphql/playground).

You can easily download the GraphQL schema using [@apollo/rover](https://www.apollographql.com/docs/rover/):

```bash
$ npx -p @apollo/rover rover graph introspect https://api.sorare.com/graphql > schema.graphql
```

## Federated API

### Football

The Football-specific resources are either not prefixed or prefixed with `So5`: `Card`, `Player`, `So5Fixture`, `So5Leaderboard`, etc. Query fields are available under the `football` root field.

### MLB & NBA

The MLB-specific and NBA-specific resources are prefixed with `Baseball` and `NBA` respectively: `BaseballCard`, `BaseballPlayer`, `BaseballFixture`, `BaseballLeaderboard`, etc.

### NFTs & Cards

Each sport has their own `Card` types. The blockchain cards are also available as sport-agnostic `Token` types. Each `Token` belongs to a `collectionName` that is either `football`, `baseball` or `nba`. For example, the `TokenRoot` type allows to query `offers`, `auctions` and `nfts` to get **Sorare: Football**, **Sorare: MLB** and **Sorare: NBA** tokens.

It also exposes 2 sport-agnostic subscriptions to get notified about any auctions & offers getting updated:

- `tokenAuctionWasUpdated`
- `tokenOfferWasUpdated`

While the identifier of a **Sorare: Football** card used to be its `slug`, the identifier of a sport-agnostic NFT (`Token`) is its `assetId`.

## User Authentication

### Pre-requisites

To authenticate yourself programmatically through our GraphQL API you'll need:

- your email
- the **hashed version** of your password

Your **password needs to be hashed** client-side using a salt. The salt can be retrieved with a HTTP GET request against our `https://api.sorare.com/api/v1/users/<youremail>` endpoint:

**Example:**

```bash
$ curl https://api.sorare.com/api/v1/users/myemail@mydomain.com

{"salt":"$2a$11$SSOPxn8VSUP90llNuVn.nO"}
```

The hashed password must be computed with _bcrypt_:

**Example in JavaScript:**

```javascript
import bcrypt from "bcryptjs";

const hashedPassword = bcrypt.hashSync(password, salt);
```

**Example in Ruby:**

```ruby
require "bcrypt"

hashed_password = BCrypt::Engine.hash_secret(password, salt)
```

**Example in Python:**

```python
import bcrypt

hashed_password = bcrypt.hashpw(password, salt)
```

Please also make sure to set the `content-type` HTTP header to `application/json`.

### GraphQL `signIn` mutation

For short and long-lived authentication, you should request a [JWT token](https://jwt.io/).

We provide JWT tokens within the `signIn` mutation. They can be retrieve using the following mutation:

```gql
mutation SignInMutation($input: signInInput!) {
  signIn(input: $input) {
    currentUser {
      slug
      jwtToken(aud: "<YourAud>") {
        token
        expiredAt
      }
    }
    errors {
      message
    }
  }
}
```

It expects the following variables:

```json
{
  "input": {
    "email": "your-email",
    "password": "your-hashed-password"
  }
}
```

`<YourAud>` is a mandatory _string_ parameter that identifies the recipients that the JWT is intended for. Your can read more about "aud" (Audience) [here](https://datatracker.ietf.org/doc/html/rfc7519.html#section-4.1.3). We recommend to use an `aud` reflecting the name of your app - like `myappname` - to make it easier to debug & track.

```bash
$ curl 'https://api.sorare.com/federation/graphql' \
-H 'content-type: application/json' \
-d '{
  "operationName": "SignInMutation",
  "variables": { "input": { "email": "<YourEmail>", "password": "<YourHashPassword>" } },
  "query": "mutation SignInMutation($input: signInInput!) { signIn(input: $input) { currentUser { slug jwtToken(aud: \"<YourAud>\") { token expiredAt } } errors { message } } }"
}'

{"data":{"signIn":{"currentUser":{"slug":"<YourSlug>","jwtToken":{"token":"<YourJWTToken>","expiredAt":"..."}},"errors":[]}}}
```

You shall then pass the token with an `Authorization` header alongside a `JWT-AUD` header to all next API requests:

```bash
$ curl 'https://api.sorare.com/federation/graphql' \
-H 'content-type: application/json' \
-H 'Authorization: Bearer <YourJWTToken>' \
-H 'JWT-AUD: <YourAud>' \
-d '{
    "operationName": "CurrentUserQuery",
    "query": "query CurrentUserQuery { currentUser { slug email } }"
}'

{"data":{"currentUser":{"slug":"<YourSlug>","email":"<YourEmail>"}}}
```

The token will expire after 30 days.

### Errors

Please refer to the `errors` field to understand why a `signIn` mutation failed.

If `currentUser` is `null` and you don't have any `errors`, it's because the user has 2FA setup. Please follow the next section to handle 2FA signins.

Please note also that if the token has been issued from a specific IP address and you try to generate it from another one, 2FA will automatically activate and you will need the code sent to your email to complete authentication.

### 2FA

For account with 2FA enabled the `signIn` mutation will set the `otpSessionChallenge` field instead of the `currentUser` one.

```gql
mutation SignInMutation($input: signInInput!) {
  signIn(input: $input) {
    currentUser {
      slug
      jwtToken(aud: "<YourAud>") {
        token
        expiredAt
      }
    }
    otpSessionChallenge
    errors {
      message
    }
  }
}
```

**Example:**

```bash
$ curl 'https://api.sorare.com/federation/graphql' \
-H 'content-type: application/json' \
-d '{
  "operationName": "SignInMutation",
  "variables": { "input": { "email": "<YourEmail>", "password": "<YourHashPassword>" } },
  "query": "mutation SignInMutation($input: signInInput!) { signIn(input: $input) { currentUser { slug jwtToken(aud: \"<YourAud>\") { token expiredAt } } otpSessionChallenge errors { message } } }"
}'

{"data":{"signIn":{"currentUser":null,"otpSessionChallenge":"3a390a0661cd6f4944205f68c13fd04f","errors":[]}}}
```

In this case, you will need to make another call to the `signIn` mutation and provide the `otpSessionChallenge` value you received and a one-time token from your 2FA device as `otpAttempt`:

```json
{
  "input": {
    "otpSessionChallenge": "eca010be19a80de5c134c324af24c36f",
    "otpAttempt": "788143"
  }
}
```

**Example:**

```bash
$ curl 'https://api.sorare.com/federation/graphql' \
-H 'content-type: application/json' \
-d '{
  "operationName": "SignInMutation",
  "variables": { "input": { "otpSessionChallenge": "<YourOTPSessionChallenge>", "otpAttempt": "<YourOTPAttemp>" } },
  "query": "mutation SignInMutation($input: signInInput!) { signIn(input: $input) { currentUser { slug jwtToken(aud: \"<YourAud>\") { token expiredAt } } errors { message } } }"
}'

{"data":{"signIn":{"currentUser":{"slug":"<YourSlug>","jwtToken":{"token":"<YourJWTToken>","expiredAt":"..."}},"errors":[]}}}
```

There is no way currently to revoke the token.

### Updated Terms & Conditions

Should the Terms & Conditions of Sorare get updated, you might need to accept them before being able to sign in. Please refer to [https://sorare.com/terms_and_conditions](https://sorare.com/terms_and_conditions) to read the latest version of Sorare's terms.

You can accept the terms without being signed in by retrieving the `tcuToken` returned by the failing `signIn` mutation with `must_accept_tcus` error:

```gql
mutation SignInMutation($input: signInInput!) {
  signIn(input: $input) {
    currentUser {
      slug
      jwtToken(aud: "<YourAud>") {
        token
        expiredAt
      }
    }
    otpSessionChallenge
    tcuToken
    errors {
      message
    }
  }
}
```

If the `tcuToken` is set, you can accept the updated Terms & Conditions with the following mutation:

```gql
mutation AcceptTermsMutation($input: acceptTermsInput!) {
  acceptTerms(input: $input) {
    errors {
      message
    }
  }
}
```

And the following variables:

```json
{
  "input": {
    "acceptTerms": true,
    "acceptPrivacyPolicy": true,
    "acceptGameRules": true,
    "tcuToken": "<YourTcuToken>"
  }
}
```

Once terms are accepted, you will be able to sign in again.

## OAuth Authentication / Login with Sorare

With our [OAuth](https://oauth.net/2/) API, users can sign-in to your service using their Sorare account, which allows you to request data on their behalf.

In order to use our OAuth API, we need to issue you a Client ID and Secret for your application. You can request one through our [Help Center](https://help.sorare.com/hc/en-us/requests/new) with the following information:

- A unique name for your application
- One or more callback URLs (e.g., `http://localhost:3000/auth/sorare/callback` for development & `https://myapp.com/auth/sorare/callback` for production)
- A logo for your application in PNG format

### OAuth Credentials

Once we validate your application, you will be provided with:

- OAuth Client ID
- OAuth Secret (keep this secret!)

### OAuth Scopes

All OAuth applications are provided with one scope which allows access to the following:

- Basic user information, including their nickname, avatar, and wallet address
- User's cards, achievements and favorites
- User's auctions, offers and notifications

The following are not accessible:

- Email addresses
- Future lineups and rewards
- Claiming rewards
- Bidding, selling, or making offers cards
- Accepting offers or initiating withdrawals

### Access & Refresh Tokens

First you need to create a "Login with Sorare" link in your app and use the following `href`:

```
https://sorare.com/oauth/authorize?client_id=<YourUID>&redirect_uri=<YourURLEncodedCallbackURI>&response_type=code&scope=
```

Once signed in to Sorare, the user will be asked to authorize your app and will ultimately be redirected to your `redirect_uri` with a `?code=` query parameter, for instance `https://myapp.com/auth/sorare/callback?code=<YourCode>`.

To request an OAuth access token you can then call the `https://api.sorare.com/oauth/token` endpoint with the following parameters:

- `client_id=<YourOAuthUID>`
- `client_secret=<YourOAuthSecret>`
- `code=<TheRetrievedCode>`
- `grant_type=authorization_code`
- `redirect_uri=<TheSameCallbackURIAsBefore>`

To refresh an OAuth token you can then call the `https://api.sorare.com/oauth/token` endpoint with the following parameters:

- `client_id=<YourOAuthUID>`
- `client_secret=<YourOAuthSecret>`
- `refresh_token=<RefreshToken>`
- `grant_type=refresh_token`

**Example:**

```bash
$ curl -X POST "https://api.sorare.com/oauth/token" \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'client_id=<YourOAuthUID>&client_secret=<YourOAuthSecret>&code=<TheRetrievedCode>&grant_type=authorization_code&redirect_uri=<TheSameCallbackURIAsBefore>'

{"access_token":"....", "refresh_token": "....", "token_type":"Bearer","expires_in":7200,"refresh_token":"...","scope":"public","created_at":1639608238}
```

You can then use the `access_token` the same way you would use a JWT token:

```bash
curl 'https://api.sorare.com/federation/graphql' \
-H 'content-type: application/json' \
-H 'Authorization: Bearer <TheUserAccessToken>' \
-d '{
    "operationName": "CurrentUserQuery",
    "query": "query CurrentUserQuery { currentUser { slug } }"
}'

{"data":{"currentUser":{"slug":"<ASlug>"}}}
```

You can refresh the token

```bash
$ curl -X POST "https://api.sorare.com/oauth/token" \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'client_id=<YourOAuthUID>&client_secret=<YourOAuthSecret>&refresh_token=<RefreshToken>&grant_type=refresh_token'

{"access_token":"....", "refresh_token": "....", "token_type":"Bearer","expires_in":7200,"refresh_token":"...","scope":"public","created_at":1639608239}
```


## Rate limit

The GraphQL API is rate limited. We can provide an extra API Key on demand that raises those limits.

Here are the configured limits:

- Unauthenticated API calls: 20 calls per minute
- Authenticated (JWT or OAuth) API calls: 60 calls per minute
- API Key API calls: 600 calls per minute

The API key should be passed in an http `APIKEY` header.

**Example:**

```bash
curl 'https://api.sorare.com/federation/graphql' \
-H 'content-type: application/json' \
-H 'APIKEY: <YourPrivateAPIKey>' \
-H 'Authorization: Bearer <TheUserAccessToken>' \
-d '{
    "operationName": "CurrentUserQuery",
    "query": "query CurrentUserQuery { currentUser { slug } }"
}'
```

Whenever you perform too many requests, the GraphQL API will answer with a `429` HTTP error code and add a `Retry-After: <TimeToWaitInSeconds>` header (see [RFC](https://datatracker.ietf.org/doc/html/rfc6585#section-4)) to the response so your code can rely on it to understand how long it should wait before retrying.

## GraphQL Complexity and Depth limits

The GraphQL queries have complexity and depth limits. We can provide extra API keys (on demand) raising those limits.

- Depth reflects the longest nested fields chain.
- Complexity reflects the potential total number of fields that would be returned. If the query asks for the first 50 cards, the complexity is computed on 50 cards, even if the result set is composed of 1 card.

We have the following limits:

|  | Depth limit | Complexity limit |
| --- | --- | --- |
| Anonymous API calls | 7 | 500 |
| Anonymous subscription | 7 | 500 |
| Authenticated API calls | 12 | 30 000|
| Authenticated subscription | 9 | 1 500 |


## CORS

Our GraphQL API cannot be called from the browser on another domain than the ones we support. Therefore, it's expected to get a `Blocked by CORS policy [...]: The ‘Access-Control-Allow-Origin’ header has a value [...]` error.

Please consider calling the API from your backend servers.

## Pagination

A common use case in GraphQL is traversing the relationship between sets of objects. There are a number of different ways that these relationships can be exposed in GraphQL, giving a varying set of capabilities to the client developer.

Read more about GraphQL pagination on their [official documentation](https://graphql.org/learn/pagination/).

At Sorare, we use both [plural types](https://graphql.org/learn/pagination/#plurals) for connections with a limited cardinality and [cursor-based pagination](https://graphql.org/learn/pagination/#pagination-and-edges) for the others.

A working JavaScript code sample demonstrating how to leverage the `cursor` to iterate on all cards of a single user is available in [examples/allCardsFromUser.js](./examples/allCardsFromUser.js).

## Examples

Every operation that involves card or ETH transfer must be signed with your Starkware _private key_. It can be exported from [sorare.com](https://www.sorare.com) using your wallet.

**Make sure to keep your Private Key secret**.

![Private key export](./private_key_export.png)

To sign with your Starkware _private key_ in JavaScript, we recommend using the JavaScript package [`@sorare/crypto`](https://github.com/sorare/crypto).

### Listing auctions

To list the latest auctions, you can use the following query:

```gql
query ListLast10EnglishAuctions {
  transferMarket {
    englishAuctions(last: 10) {
      nodes {
        slug
        currentPrice
        endDate
        bestBid {
          amount
          bidder {
            ... on User {
              nickname
            }
          }
        }
        minNextBid
        cards {
          slug
          name
          rarity
        }
      }
    }
  }
}
```

A working JavaScript code sample is available in [examples/listEnglishAuctions.js](./examples/listEnglishAuctions.js).

## Bidding on auction

To make a bid on an auction, you'll need multiple prerequisites:

- the GraphQL API needs to be called authenticated (see above how to get an Authorization `token`)
- your Starkware private key
- the `slug` of the auction you want to bid for
- the `amount` (in wei) you want to bid

Here are the few steps required to bid:

1. Retrieve your `starkKey` using the `currentUser` query:

   ```gql
   query CurentUserQuery {
     currentUser {
       starkKey
     }
   }
   ```

1. Get the `id`, `blockchainId`, and `minNextBid` of the auction you want to bid for:

   ```gql
   query EnglishAuctionLimitOrder($auctionSlug: String!) {
     englishAuction(slug: $auctionSlug) {
       id
       blockchainId
       minNextBid
     }
   }
   ```

1. Get the list of `LimitOrder` objects from the `prepareBid` mutation on the auction you want to bid for, with the amount you want to bid:

   ```js
   const prepareBidInput = {
     englishAuctionId: englishAuctionBlockchainId,
     bidAmountWei: bidAmountInWei,
   };
   ```

   ```gql
   mutation PrepareBid($input: prepareBidInput!) {
     prepareBid(input: $input) {
       limitOrders {
         vaultIdSell
         vaultIdBuy
         amountSell
         amountBuy
         tokenSell
         tokenBuy
         nonce
         expirationTimestamp
       }
     }
   }
   ```

1. Sign all `LimitOrder` objects and build the `bidInput` argument.

   ```js
   const starkSignatures = limitOrders.map((limitOrder) => ({
     data: JSON.stringify(signLimitOrder(privateKey, limitOrder)),
     nonce: limitOrder.nonce,
     expirationTimestamp: limitOrder.expirationTimestamp,
     starkKey,
   }));

   const bidInput = {
     starkSignatures,
     auctionId: englishAuctionId,
     amount: bidAmountInWei,
     clientMutationId: crypto.randomBytes(8).join(""),
   };
   ```

   Note that the `clientMutationId` is using a random ID.

1. Call the `bid` mutation:

   ```gql
   mutation Bid($input: bidInput!) {
     bid(input: $input) {
       bid {
         id
       }
       errors {
         message
       }
     }
   }
   ```

A working JavaScript code sample is available in [examples/bidAuctionWithEth.js](./examples/bidAuctionWithEth.js).

## Creating offers

To create a Direct, Single Sale or Single Buy offer, you'll need multiple prerequisites:

- the GraphQL API needs to be called authenticated (see above how to get an Authorization `token`)
- your Starkware private key
- the `assetId` of the card you want to send (and/or the amount of ETH you want to send)
- the list of card `assetIds` you want to receive in return (and/or the amount of ETH you want to receive)

Here are the few steps required to create an offer:

1. Retrieve your `starkKey` using the `currentUser` query:

   ```gql
   query CurentUserQuery {
     currentUser {
       starkKey
     }
   }
   ```

1. Build the `prepareOfferInput` argument:

   ```js
   const prepareOfferInput = {
     type: "SINGLE_SALE_OFFER",
     sendAssetIds: [tokenAssetId],
     receiveAssetIds: [],
     sendWeiAmount: "0",
     receiveWeiAmount: aWeiAmountAsString,
     receiverSlug: null,
     clientMutationId: crypto.randomBytes(8).join(""),
   };
   ```

1. Get the list of `LimitOrder` objects from the `limitOrders` field of the `prepareOffer` mutation:

   ```gql
   mutation NewOfferLimitOrders($input: prepareOfferInput!) {
     prepareOffer(input: $input) {
       limitOrders {
         amountBuy
         amountSell
         expirationTimestamp
         feeInfo {
           feeLimit
           tokenId
           sourceVaultId
         }
         nonce
         tokenBuy
         tokenSell
         vaultIdBuy
         vaultIdSell
       }
       errors {
         message
       }
     }
   }
   ```

1. Sign all `LimitOrder` objects and build the `createSingleSaleOfferInput` argument.

   ```js
   const starkSignatures = limitOrders.map((limitOrder) => ({
     data: JSON.stringify(signLimitOrder(privateKey, limitOrder)),
     nonce: limitOrder.nonce,
     expirationTimestamp: limitOrder.expirationTimestamp,
     starkKey,
   }));

   const createSingleSaleOfferInput = {
     starkSignatures,
     dealId: crypto.randomBytes(8).join(""),
     assetId: aCardAssetId,
     price: aWeiAmountAsString,
     clientMutationId: crypto.randomBytes(8).join(""),
   };
   ```

   Note that the `clientMutationId` and `dealId` are using random IDs.

1. Call the `createSingleSaleOffer` (or `createDirectOffer` or `createSingleBuyOffer`) mutation:

   ```gql
   mutation CreateSingleSaleOffer($input: createSingleSaleOfferInput!) {
     createSingleSaleOffer(input: $input) {
       offer {
         id
       }
       errors {
         message
       }
     }
   }
   ```

A working JavaScript code sample is available in [examples/createSingleSaleOffer.js](./examples/createSingleSaleOffer.js).

## Accepting offers

To accept a Direct, Single Sale or Single Buy offer, you'll need multiple prerequisites:

- the GraphQL API needs to be called authenticated (see above how to get an Authorization `token`)
- your Starkware private key
- the `id` of the offer you want to accept

Here are the few steps required to create an offer:

1. Retrieve your `starkKey` using the `currentUser` query:

   ```gql
   query CurentUserQuery {
     currentUser {
       starkKey
     }
   }
   ```

1. Get the `blockchainId` of the Offer:

   ```gql
   query GetOffer($id: String!) {
     transferMarket {
       offer(id: $id) {
         blockchainId
       }
     }
   }
   ```

1. Build the `prepareAcceptOfferInput` argument:

   ```js
   const prepareAcceptOfferInput = {
     dealId: blockchainId,
   };
   ```

1. Get the list of `LimitOrder` objects from the `limitOrders` field of the `prepareAcceptOffer` mutation:

   ```gql
   mutation PrepareAcceptOffer($input: prepareAcceptOfferInput!) {
     prepareAcceptOffer(input: $input) {
       limitOrders {
         amountBuy
         amountSell
         expirationTimestamp
         feeInfo {
           feeLimit
           tokenId
           sourceVaultId
         }
         id
         nonce
         tokenBuy
         tokenSell
         vaultIdBuy
         vaultIdSell
       }
       errors {
         message
       }
     }
   }
   ```

1. Sign all `LimitOrder` objects and build the `acceptOfferInput` argument.

   ```js
   const starkSignatures = limitOrders.map((limitOrder) => ({
     data: JSON.stringify(signLimitOrder(privateKey, limitOrder)),
     nonce: limitOrder.nonce,
     expirationTimestamp: limitOrder.expirationTimestamp,
     starkKey,
   }));

   const acceptOfferInput = {
     starkSignatures,
     blockchainId: offer["blockchainId"],
     clientMutationId: crypto.randomBytes(8).join(""),
   };
   ```

   Note that the `clientMutationId` is using a random ID.

1. Call the `acceptOffer` mutation:

   ```gql
   mutation AcceptSingleSaleOffer($input: acceptOfferInput!) {
     acceptOffer(input: $input) {
       offer {
         id
       }
       errors {
         message
       }
     }
   }
   ```

A working JavaScript code sample is available in [examples/acceptSingleSaleOffer.js](./examples/acceptSingleSaleOffer.js).

## Fetching MLB cards

```js
const slugs = [slug1, slug2];
```

```gql
query GetBaseballCardBySlugs($slugs: [String!]) {
  baseballCards(slugs: $slugs) {
    assetId
    slug
    rarity
    season
    serialNumber
    positions
    team {
      name
    }
    player {
      displayName
    }
  }
}
```

A working JavaScript code sample is available in [examples/getBaseballCard.js](./examples/getBaseballCard.js).

## Fetching the price of an NBA card

```js
const slugs = [slug1, slug2];
```

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

A working JavaScript code sample is available in [examples/getNBACardPrice.js](./examples/getNBACardPrice.js).

## Subscribing to GraphQL events

The Sorare API provides different GraphQL events to subscribe to:

- `aCardWasUpdated`: triggers every time a football card is updated. This can be filtered using the following arguments: `ages`, `cardEditions`, `playerSlugs`, `positions`, `owned`, `rarities`, `seasonStartYears`, `serialNumbers`, `shirtNumbers`, `slugs`
- `bundledAuctionWasUpdated`: triggers every time a (bundled) english auction is updated
- `currentUserWasUpdated`: scoped to the current user, triggers every time the current user is updated (only works when authenticated)
- `gameWasUpdated`: triggers every time a game is updated
- `offerWasUpdated`: scoped to the received and the sender of the offer, triggers every time an offer is updated (only works when authenticated with the sender or the receiver)
- `publicMarketWasUpdated`: triggers every time a card is updated on a public market (auction and single sale offers): on a bid, when an auction ends, when a single sale offer is accepted.
- `tokenAuctionWasUpdated`: triggers every time an auction is updated (`football`, `baseball` & `nba` collections)
- `tokenOfferWasUpdated`: triggers every time an offer is updated (`football`, `baseball` & `nba` collections)

The websocket URL to use is `wss://ws.sorare.com/cable`.

Sorare's GraphQL subscriptions are implemented through websockets with the `actioncable-v1-json` sub-protocol. Sorare relies on [ActionCable](https://guides.rubyonrails.org/action_cable_overview.html) because the [sorare.com](https://sorare.com) website has been scaled on a Ruby on Rails stack.

### JavaScript

In order to ease the websocket + `actioncable-v1-json` sub-protocoal usage outside of a Ruby on Rails environment, you can use the TypeScript/JavaScript package [`@sorare/actioncable`](https://github.com/sorare/actioncable):

```bash
$ yarn add @sorare/actioncable
```

#### Football only

```js
const { ActionCable } = require("@sorare/actioncable");

const cable = new ActionCable({
  headers: {
    // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
    // 'APIKEY': '<YourOptionalAPIKey>'
  },
});

cable.subscribe("aCardWasUpdated { slug }", {
  connected() {
    console.log("connected");
  },

  disconnected(error) {
    console.log("disconnected", error);
  },

  rejected(error) {
    console.log("rejected", error);
  },

  received(data) {
    const aCardWasUpdated = data?.result?.data?.aCardWasUpdated;
    if (!aCardWasUpdated) {
      return;
    }
    const { id } = aCardWasUpdated;
    console.log("a card was updated", id);
  },
});
```

A working JavaScript code sample is available in [examples/subscribeAllCardUpdates.js](./examples/subscribeAllCardUpdates.js).

#### Football, MLB & NBA tokens

Example of GraphQL subscription to get notified each time an offer is updated:

```gql
subscription {
  tokenOfferWasUpdated {
    status
    actualReceiver {
      ... on User {
        slug
      }
    }
    sender {
      ... on User {
        slug
      }
    }
    senderSide {
      wei
      fiat {
        eur
        usd
        gbp
      }
      nfts {
        assetId
        collectionName
      }
    }
    receiverSide {
      wei
      fiat {
        eur
        usd
        gbp
      }
      nfts {
        assetId
        collectionName
        metadata {
          ... on TokenCardMetadataInterface {
            playerSlug
            rarity
            serialNumber
          }
        }
      }
    }
  }
}
```

Example of GraphQL subscription to get notified each time an auction is updated:

```gql
subscription {
  tokenAuctionWasUpdated {
    open
    bestBid {
      amount
      amountInFiat {
        eur
        usd
        gbp
      }
      bidder {
        ... on User {
          slug
        }
      }
    }
    bids {
      nodes {
        amount
        amountInFiat {
          eur
          usd
          gbp
        }
        bidder {
          ... on User {
            slug
          }
        }
      }
    }
    nfts {
      assetId
      collectionName
      metadata {
        ... on TokenCardMetadataInterface {
          playerSlug
          rarity
          serialNumber
        }
      }
    }
  }
}
```

A working JavaScript code sample is available in [examples/subscribeTokenWasUpdated.js](./examples/subscribeTokenWasUpdated.js).

### Python with websocket-client

```bash
$ pip3 install websocket-client
```

```python
import websocket
import json
import time

w_socket = 'wss://ws.sorare.com/cable'
identifier = json.dumps({"channel": "GraphqlChannel"})

subscription_query = {
  "query": "subscription onAnyCardUpdated { aCardWasUpdated { slug } }",
  "variables": {},
  "operationName": "onAnyCardUpdated",
  "action": "execute"
}

def on_open(ws):
  subscribe_command = {"command": "subscribe", "identifier": identifier}
  ws.send(json.dumps(subscribe_command).encode())

  time.sleep(1)

  message_command = {
    "command": "message",
    "identifier": identifier,
    "data": json.dumps(subscription_query)
  }
  ws.send(json.dumps(message_command).encode())

def on_message(ws, data):
  message = json.loads(data)
  type = message.get('type')
  if type == 'welcome':
    pass
  elif type == 'ping':
    pass
  elif message.get('message') is not None:
    print(message['message'])

def on_error(ws, error):
  print('Error:', error)

def on_close(ws, close_status_code, close_message):
  print('WebSocket Closed:', close_message, close_status_code)

def long_connection():
  ws = websocket.WebSocketApp(
    w_socket,
    on_message=on_message,
    on_close=on_close,
    on_error=on_error,
    on_open=on_open
  )
  ws.run_forever()

if __name__ == '__main__':
  long_connection()
```

A working Python3 code sample is available in [examples/subscribe_all_card_updates.py](./examples/subscribe_all_card_updates.py).

### Python with graphql-python/gql

Using the [gqlactioncable](https://github.com/leszekhanusz/gql-actioncable) package, it is now possible
to make subscriptions using [graphql-python/gql](https://github.com/graphql-python/gql).

```bash
$ pip install gqlactioncable
```

```python
import asyncio

from gql import Client, gql

from gqlactioncable import ActionCableWebsocketsTransport


async def main():

    transport = ActionCableWebsocketsTransport(
        url="wss://ws.sorare.com/cable",
    )

    async with Client(transport=transport) as session:

        subscription = gql(
            """
            subscription onAnyCardUpdated {
              aCardWasUpdated {
                slug
              }
            }
        """
        )

        async for result in session.subscribe(subscription):
            print(result)


asyncio.run(main())
```

This example is available in [examples/gql_subscription_all_cards.py](./examples/gql_subscription_all_cards.py).

See also an example for http queries with gql: [examples/gql_query_all_cards.py](./examples/gql_query_all_cards.py).
