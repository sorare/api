const { GraphQLClient, gql } = require("graphql-request");

const ListLast10SingleSaleOffers = gql`
  query ListLast10SingleSaleOffers {
    tokens {
      liveSingleSaleOffers(last: 10) {
        nodes {
          id
          senderSide {
            anyCards {
              slug
            }
            amounts {
              wei
            }
          }
        }
      }
    }
  }
`;

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
      // 'APIKEY': '<YourOptionalAPIKey>'
    },
  });

  const data = await graphQLClient.request(ListLast10SingleSaleOffers);
  data["tokens"]["liveSingleSaleOffers"]["nodes"].forEach(
    (singleSaleOffer) => {
      console.log(singleSaleOffer);
    }
  );
}

main().catch((error) => console.error(error));
