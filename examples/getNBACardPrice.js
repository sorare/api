const { GraphQLClient, gql } = require("graphql-request");

const GetBestBid = gql`
  query GetBestBid($slugs: [String!]!) {
    anyCards(slugs: $slugs) {
      latestEnglishAuction {
        bestBid {
          amounts {
            wei
            eur
            gbp
            usd
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
    }
  );

  const prices = await graphQLClient.request(GetBestBid, {
    slugs: [slug],
  });
  console.log(prices);
}

main().catch((error) => console.error(error));
