const { GraphQLClient, gql } = require("graphql-request");

const ListLast10EnglishAuctions = gql`
  query ListLast10EnglishAuctions {
    tokens {
      liveAuctions(last: 10) {
        nodes {
          slug
          currentPrice
          endDate
          bestBid {
            amounts {
              wei
            }
            bidder {
              ... on User {
                nickname
              }
            }
          }
          minNextBid
          anyCards {
            slug
            name
            rarity
          }
        }
      }
    }
  }
`;

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/federation/graphql", {
    headers: {
      // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
      // 'APIKEY': '<YourOptionalAPIKey>'
    },
  });

  const data = await graphQLClient.request(ListLast10EnglishAuctions);
  data["transferMarket"]["englishAuctions"]["nodes"].forEach((auction) => {
    console.log(auction);
  });
}

main().catch((error) => console.error(error));
