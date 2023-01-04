const { GraphQLClient, gql } = require("graphql-request");

const GetNBACardsAssetIds = gql`
  query GetNBACardsAssetIds($slugs: [String!]) {
    nbaCards(slugs: $slugs) {
      assetId
    }
  }
`;

const GetNBACardsPrices = gql`
  query GetNBACardsPrices($assetIds: [String!]!) {
    tokens {
      nfts(
        assetIds: $assetIds
      ) {
        latestEnglishAuction {
          bestBid {
            amount
            amountInFiat { eur gbp usd }
          }
        }
      }
    }
  }
`;

const slug = "jeremy-sochan-20030520-2022-rare-134";

async function main() {
  const USSportsGraphQLClient = new GraphQLClient("https://api.sorare.com/sports/graphql", {
    headers: {
      // AUTHENTICATION NOT SUPPORTED FOR NOW
    },
  });
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
      // 'APIKEY': '<YourOptionalAPIKey>'
    },
  });

  const data = await USSportsGraphQLClient.request(GetNBACardsAssetIds, {
    slugs: [slug]
  });
  const assetIds = data.nbaCards.map(card => card.assetId)
  const prices = await graphQLClient.request(GetNBACardsPrices, {
    assetIds: assetIds
  });
  console.log(prices)
}

main().catch((error) => console.error(error));
