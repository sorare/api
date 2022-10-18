const { GraphQLClient, gql } = require("graphql-request");

const GetBaseballCardByAssetId = gql`
  query GetBaseballCardByAssetId($slugs: [String!]) {
    nbaCards(slugs: $slugs) {
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

const slug = "giannis-antetokounmpo-19941206-2022-super_rare-1"; // FIXME

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/sports/graphql", {
    headers: {
      // AUTHENTICATION NOT SUPPORTED FOR NOW
    },
  });

  const data = await graphQLClient.request(GetBaseballCardByAssetId, {
    slugs: [slug]
  });
  console.log(data.baseballCards);
}

main().catch((error) => console.error(error));
