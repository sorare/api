const { GraphQLClient, gql } = require("graphql-request");

const GetNBACardByAssetId = gql`
  query GetNBACardByAssetId($slugs: [String!]) {
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

  const data = await graphQLClient.request(GetNBACardByAssetId, {
    slugs: [slug]
  });
  console.log(data.nbaCards);
}

main().catch((error) => console.error(error));
