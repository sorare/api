# API

We are committed to providing an open platform for developers to build upon.

While the Cards themselves are stored on the Ethereum blockchain (or in the Starkware rollup) we support an API that provides more detailed information.

Our API is using the [GraphQL](https://graphql.org/) query language and documented in our [GraphQL playground](https://api.sorare.com/graphql/playground).

## Authentication

### Pre-requisites

Before being authenticated with an `Authorization` HTTP header, all requests performed on our GraphQL API need:
 - a valid `_sorare_session_id` HTTP cookie that you'll need to pass to all future API requests
 - a valid `csrf-token` that you'll need to pass as a `x-csrf-token` HTTP header to all future API requests

While using our [GraphQL playground](https://api.sorare.com/graphql/playground), the `_sorare_session_id`, the `x-csrf-token` are set automatically by the playground and your browser.

Please also make sure to specify the `content-type` HTTP header to `application/json`.

To authenticate yourself programmatically through our GraphQL API you'll need:
 - your email
 - the **hashed version** of your password

Your **password needs to be hashed** client-side using a salt. The salt can be retrieved alongside the `_sorare_session_id` and `csrf-token` with a HTTP GET request on our `https://api.sorare.com/api/v1/users/<youremail>` endpoint:

**Example:**

```bash
$ curl -vvv https://api.sorare.com/api/v1/users/myemail@mydomain.com

[...]
< csrf-token: Rd1eqXQfPJduNjoq [...] <<= the `x-csrf-token` value can be retrieved here
< set-cookie: _sorare_session_id=az%2FCsH%2BRcO%2B[...]; domain=.sorare.com; path=/; secure; HttpOnly; SameSite=None <== the `_sorare_session_id` cookie value can be retrieved here
[...]

{"salt":"$2a$11$SSOPxn8VSUP90llNuVn.nO"}
```

The hashed password must be computed with *bcrypt*:

**Example in JavaScript:**

```javascript
import bcrypt from 'bcryptjs';

const hashedPassword = bcrypt.hashSync(password, salt);
```

**Example in Ruby:**

```ruby
require "bcrypt"

hashed_password = BCrypt::Engine.hash_secret(password, salt)
```

### GraphQL `signIn` mutation

A GraphQL mutation is available for authentication: `signIn`.

```gql
mutation SignInMutation($input: signInInput!) {
  signIn(input: $input) {
    currentUser {
      slug
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

**Example:**

```bash
$ curl 'https://api.sorare.com/graphql' \
-H 'content-type: application/json' \
-H 'x-csrf-token: <YourCSRFTokenValue>' \
-H 'cookie: _sorare_session_id=<YourCookieValue>' \
-d '{
  "operationName": "SignInMutation",
  "variables": { "input": { "email": "<YourEmail>", "password": "<YourHashPassword>" } },
  "query": "mutation SignInMutation($input: signInInput!) { signIn(input: $input) { currentUser { slug email } errors { message } } }"
}'

{"data":{"signIn":{"currentUser":{"slug":"<YourSlug>","email":"<YourEmail>"},"errors":[]}}}
```

Should you keep the same `cookie` for future API calls, they will then be authenticated as this user.

```bash
$ curl 'https://api.sorare.com/graphql' \
-H 'content-type: application/json' \
-H 'x-csrf-token: <TheSameCSRFTokenValue>' \
-H 'cookie: _sorare_session_id=<TheSameCookieValue>' \
-d '{
  "operationName": "CurrentUserQuery",
  "query": "query CurrentUserQuery { currentUser { slug email } }"
}'

{"data":{"currentUser":{"slug":"<YourSlug>","email":"<YourEmail>"}}}
```

This is exactly the authentication mechanism that happens while browsing the [sorare.com](https://sorare.com) website.

### GraphQL `signIn` mutation & JWT tokens

A better way than cookies to stay authenticated is to rely on [JWT tokens](https://jwt.io/).

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

`<YourAud>` is a mandatory *string* parameter that helps (us & you) identifying your app. We recommend to use an `aud` reflecting the name of your app - like `myappname` - to make it easier to debug & track.

```bash
$ curl 'https://api.sorare.com/graphql' \
-H 'content-type: application/json' \
-H 'x-csrf-token: <YourCSRFTokenValue>' \
-H 'cookie: _sorare_session_id=<YourCookieValue>' \
-d '{
  "operationName": "SignInMutation",
  "variables": { "input": { "email": "<YourEmail>", "password": "<YourHashPassword>" } },
  "query": "mutation SignInMutation($input: signInInput!) { signIn(input: $input) { currentUser { slug email jwtToken(aud: \"<YourAud>\") { token expiredAt } } errors { message } } }"
}'

{"data":{"signIn":{"currentUser":{"slug":"<YourSlug>","email":"<YourEmail>","jwtToken":{"token":"<YOUR JWT TOKEN>","expiredAt":"..."}},"errors":[]}}}
```

You shall then pass the token with an `Authorization` header alongside a `JWT-AUD` header to all next API requests instead of the `cookie` and the `x-csrf-token` headers:

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

You then need to do a second call to the `signIn` mutation providing only the `otpSessionChallenge` and a valid `otpAttempt` as input:

```json
{
  "input": {
    "otpSessionChallenge": "eca010be19a80de5c134c324af24c36f",
    "otpAttempt": "788143"
  }
}
```

## OAuth / Login with Sorare

If you want to make requests on behalf of other users you can rely on the [OAuth](https://oauth.net/2/) protocol.

Please reach out to us first through our [Help Center](https://help.sorare.com/hc/en-us/requests/new) and ask us to generate you some OAuth credentials.

We need:

 - the name of your App
 - the callback URIs of your OAuth applications
     - ex: `http://localhost:3000/auth/sorare/callback` (for dev) & `https://myapp.com/auth/sorare/callback` (for prod)
 - the PNG version of your App logo

### OAuth Credentials

Once manually validated, we'll provide you with:

 - OAuth UID (or Client ID)
 - OAuth Secret (keep this secret!)

### OAuth Scopes

No specific scopes are available at the moment. All OAuth apps will be have the same privileges.

They are allowed to:

 - Access user's nickname, avatar and wallet address
 - Access details about user's Cards, achievements and favourites
 - Access details about user's auctions, offers and notifications

They are NOT allowed to:

 - Access user's email address
 - List user's future lineups, compose user's lineups, claim user's rewards
 - Bid on cards, sell user's Cards, make offers, accept offers or initiate a withdrawal

### Access & Refresh Tokens

First you need to create a "Login with Sorare" link in your app and use the following `href`:

```
https://www.sorare.com/oauth/authorize?client_id=<YourUID>&redirect_uri=<YourURLEncodedCallbackURI>&response_type=code&scope=
```

Once signed in Sorare, the user will be asked to authorize your app and will ultimately be redirected to your `redirect_uri` with a `?code=` query parameter, for instance `https://myapp.com/auth/sorare/callback?code=<YourCode>`.

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

You can then use the `access_token` like you would use a JWT token:

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

The GraphQL API is rate limited by default. We can provide an extra API Key on demand that raises those limits.

Here are the configured limits:

 - Unauthenticated API calls: 20 calls per minute
 - Authenticated (Cookie, JWT or OAuth) API calls: 60 calls per minute
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
