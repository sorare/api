const { GraphQLClient, gql } = require("graphql-request");

const ListLast10SingleSaleOffers = gql`
  query ListLast10SingleSaleOffers {
    transferMarket {
      singleSaleOffers(last: 10) {
        nodes {
          id
          card {
            slug
          }
          price
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
  data["transferMarket"]["singleSaleOffers"]["nodes"].forEach(
    (singleSaleOffer) => {
      console.log(singleSaleOffer);
    }
  );
}

main().catch((error) => console.error(error));
