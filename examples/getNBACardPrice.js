const { GraphQLClient, gql } = require("graphql-request");

const GetNBACardsPrices = gql`
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
`;

const slug = "jeremy-sochan-20030520-2022-rare-134";

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/federation/graphql", {
    headers: {
      // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
      // 'APIKEY': '<YourOptionalAPIKey>'
    },
  });

  const prices = await graphQLClient.request(GetNBACardsPrices, {
    slugs: [slug],
  });
  console.log(prices)
}

main().catch((error) => console.error(error));
