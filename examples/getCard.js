const { GraphQLClient, gql } = require("graphql-request");

const GetBaseballCardBySlug = gql`
  query GetCardBySlug($slugs: [String!]) {
    anyCards(slugs: $slugs) {
      assetId
      slug
      rarityTyped
      seasonYear
      serialNumber
      anyPositions
      anyTeam {
        name
      }
      anyPlayer {
        displayName
      }
    }
  }
`;

const slug = "aaron-judge-19920426-2022-unique-1"; // FIXME

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      // AUTHENTICATION NOT SUPPORTED FOR NOW
    },
  });

  const data = await graphQLClient.request(GetBaseballCardBySlug, {
    slugs: [slug]
  });
  console.log(data.anyCards);
}

main().catch((error) => console.error(error));
