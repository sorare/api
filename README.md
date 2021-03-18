# API

We are commited to building an open plateform on which everyone can build its own experience that leverages our assets.

The Cards are stored on the Ethereum blockchain that is publicly available but we also provide a free API with richer information.

## GraphQL

Most of our API uses the [GraphQL](https://graphql.org/) query language. It is documented in our [GraphQL playground](https://api.sorare.com/graphql/playground).

## Authentication

A GQL mutation is available for authentication: `signIn`.

It expects the following payload: `{ "user": { "email": "myemail@mydomain.com", "password": "myhashedpassword" } }`

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

Variables :
```json
{"input": {"email": "youremail", "password": "yourpassword"}}
```

The password needs to be hash client side using a salt. The salt needs to be retrieved with `GET /api/v1/users/myemail@mydomain.com`.

Once the salt is retrieved the hash password can be computed with bcrypt. In JavaScript:

```javascript
import bcrypt from 'bcryptjs';

bcrypt.hashSync(password, salt);
```

You'll also need to pass a `_sorare_session_id` cookie and a `X-CSRF-TOKEN` token header. They can be retrieved with the same request as the salt.


### With a cookie

To use a cookie authentication you need to store the new `_sorare_session_id` and `X-CSRF-TOKEN` and pass it to all next requests.


### With a JWT token

To authenticate by JWT you need to request a valid JWT token in the `signIn` mutation :

```gql
  mutation SignInMutation($input: signInInput!) {
    signIn(input: $input) {
      currentUser {
        slug
        jwtToken(aud: "YOUR_AUD") {
          token
          expiredAt
        }
      }
      ...
    }
  }
```

`YOUR_AUD` is a mandatory string parameter that should help identify your app

You can then pass it to all next requests through the following headers :

```
Authorization: Bearer YOUR_TOKEN
JWT_AUD: YOUR_AUD
```


## OAuth

If you want to make requests on behalf of other users you can pass an OAuth access token. We'll need to create the OAuth Application for you first. This is done manually for now, on request.

## Rate limit

The API is rate limited by default. We can provide an API Key on demand that raises the limits. The API key should be passed in the HTTP_APIKEY header.

