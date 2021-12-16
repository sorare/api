# API

We are committed to providing an open platform for developers to build upon.

While the Cards themselves are stored on the Ethereum blockchain (or in the Starkware rollup) we support an API that provides more detailed information.

The Sorare API is provided by [GraphQL](https://graphql.org/). Documentation can be found under the Docs section in the [GraphQL playground](https://api.sorare.com/graphql/playground).

## Authentication

### Pre-requisites

To authenticate yourself programmatically through our GraphQL API you'll need:

- your email
- the **hashed version** of your password

Your **password needs to be hashed** client-side using a salt. The salt can be retrieved with a HTTP GET request against our `https://api.sorare.com/api/v1/users/<youremail>` endpoint:

**Example:**

```bash
$ curl https://api.sorare.com/api/v1/users/myemail@mydomain.com

{"salt":"$2a$11$SSOPxn....."}
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
$ curl 'https://api.sorare.com/graphql' \
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
$ curl 'https://api.sorare.com/graphql' \
-H 'content-type: application/json' \
-H 'Authorization: Bearer <YourJWTToken>' \
-H 'JWT-AUD: <YourAud>' \
-d '{
    "operationName": "CurrentUserQuery",
    "query": "query CurrentUserQuery { currentUser { slug email } }"
}'

{"data":{"currentUser":{"slug":"<YourSlug>","email":"<YourEmail>"}}}
```

## 2FA

For account with 2FA enabled the `signIn` mutation will return an `otpSessionChallenge` instead of the `currentUser`.

In this case, you will need to make another call to the `signIn` mutation and provide the `otpSessionChallenge` value you received and a one-time token from your 2FA device as `otpAttempt`:

```json
{
  "input": {
    "otpSessionChallenge": "eca010be19a80de5c134c324af24c36f",
    "otpAttempt": "788143"
  }
}
```

## OAuth / Login with Sorare

With our [OAuth](https://oauth.net/2/) API, users can sign-in to your service using their Sorare account, which allows you to request data on their behalf.

In order to use our OAuth API, we will need to issue you a Client ID and Secret for your application. You can request one through our [Help Center](https://help.sorare.com/hc/en-us/requests/new) with the following information:

- A unique name for your application
- One or more callback URLs (e.g., `http://localhost:3000/auth/sorare/callback` for devevelopemnt & `https://myapp.com/auth/sorare/callback` for production)
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

**Example:**

```bash
$ curl -X POST "https://api.sorare.com/oauth/token" \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'client_id=<YourOAuthUID>&client_secret=<YourOAuthSecret>&code=<TheRetrievedCode>&grant_type=authorization_code&redirect_uri=<TheSameCallbackURIAsBefore>'

{"access_token":"....","token_type":"Bearer","expires_in":7200,"refresh_token":"...","scope":"public","created_at":1639608238}
```

You can then use the `access_token` the same way you would use a JWT token:

```bash
curl 'https://api.sorare.com/graphql' \
-H 'content-type: application/json' \
-H 'Authorization: Bearer <TheUserAccessToken>' \
-d '{
    "operationName": "CurrentUserQuery",
    "query": "query CurrentUserQuery { currentUser { slug } }"
}'

{"data":{"currentUser":{"slug":"<ASlug>"}}}
```

## Rate limit

The GraphQL API is rate limited. We can provide an extra API Key on demand that raises those limits.

Here are the configured limits:

- Unauthenticated API calls: 20 calls per minute
- Authenticated (JWT or OAuth) API calls: 60 calls per minute
- API Key API calls: 300 calls per minute

The API key should be passed in an http `APIKEY` header.

**Example:**

```bash
curl 'https://api.sorare.com/graphql' \
-H 'content-type: application/json' \
-H 'APIKEY: <YourPrivateAPIKey>' \
-H 'Authorization: Bearer <TheUserAccessToken>' \
-d '{
    "operationName": "CurrentUserQuery",
    "query": "query CurrentUserQuery { currentUser { slug } }"
}'
```

## Signing auction bids and offers

Every operation that involves money transfers should be signed with your Starkware private key. It can be exported from sorare.com using your wallet.

![Private key export](./private_key_export.png)

You can sign payloads using `signLimitOrder` from https://github.com/sorare/crypto.

### Signing auction bids

1. Get the signable payload

```gql
query BidLimitOrder($auctionSlug: String!, $amount: String!) {
  englishAuction(slug: $auctionSlug) {
    ... on EnglishAuctionInterface {
      limitOrders(amount: $amount) {
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
}
```

Those limit orders should be signed with your Starkware private key.

2. Post the bid with the signature

```gql
mutation Bid($input: bidInput!) {
  bid(input: $input) {
    bid {
      id
    }
  }
}
```

### Creating offers

1. Get the signable payload

```gql
mutation NewOfferLimitOrders($input: prepareOfferInput!) {
  prepareOffer(input: $input) {
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

Those limit orders should be signed with your Starkware private key.

2. Post the new offer with the signature(s)

You can then use any of `createSingleSaleOffer`, `createDirectOffer` or `createSingleBuyOffer` mutations and provide the signature. Note that you need to provide a dealId. It can be generated in the browser using: `window.crypto.getRandomValues(new Uint32Array(4)).join('')`.

### Accepting offers

1. Get the signable payload

```gql
query OfferLimitOrders($offerId: String!) {
  transferMarket {
    id
    offer(id: $offerId) {
      ... on OfferInterface {
        receiverLimitOrders {
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
  }
}
```

Those limit orders should be signed with your Starkware private key.

2. Post accept offer with the signatures(s)

Use the `acceptOffer` mutation providing the signature.
