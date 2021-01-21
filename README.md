# API

We are commited to building an open plateform on which everyone can build it's own experience that leverages our assets.

The Cards are stored on the Ethereum blockchain that is publicly available but we also provide a free API with richer information.

## GraphQL

Most of our API uses the [GraphQL](https://graphql.org/) query language. It is documented in our [GraphQL playground](https://api.sorare.com/graphql/playground).

## Authentication

A REST endpoint is available for authentication: `POST /users/sign_in.json`.

It expects the following payload: `{ "user": { "email": "myemail@mydomain.com", "password": "myhashedpassword" } }`

The password needs to be hash client side using a salt. The salt needs to be retrieved with `GET /api/v1/users/myemail@mydomain.com`.

Once the salt is retrieved the hash password can be computed with bcrypt. In JavaScript:

```javascript
import bcrypt from 'bcryptjs';

bcrypt.hashSync(password, salt);
```

You'll also need to pass a `_sorare_session` cookie and a `X-CSRF-TOKEN` token header. They can be retrieved with the same request as the salt.

Once logged in, you should store the new `_sorare_session` and `X-CSRF-TOKEN` and pass it to all next requests.

## OAuth

If you want to make requests on behalf of other users you can pass an OAuth access token. We'll need to create the OAuth Application for you first. This is done manually for now, on request.

## Rate limit

The API is rate limited by default. We can provide an API Key on demand that raises the limits. The API key should be passed in the HTTP_APIKEY header.

## Signature 

Mutations that involve money transactions might require a signature as an input (for example when trying to bid). For an example on this, you can refer the [Signature Example Folder](signature-example).
