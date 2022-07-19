const { GraphQLClient, gql } = require("graphql-request");

const GetBaseballCardByAssetId = gql`
  query GetBaseballCardByAssetId($input: BaseballCardsInput!) {
    cards(input: $input) {
      assetId
      slug
      rarity
      season
      serialNumber
      positions
      team {
        name
      }
      player {
        displayName
      }
    }
  }
`;

const assetId = "0x123456789"; // FIXME

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/mlb/graphql", {
    headers: {
      // AUTHENTICATION NOT SUPPORTED FOR NOW
    },
  });

  const input = {
    assetIds: [assetId]
  };
  const data = await graphQLClient.request(GetBaseballCardByAssetId, {
    input
  });
  console.log(data.cards);
}

main().catch((error) => console.error(error));
