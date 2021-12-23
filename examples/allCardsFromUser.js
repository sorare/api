const { GraphQLClient, gql } = require("graphql-request");

const AllCardsFromUser = gql`
  query AllCardsFromUser($slug: String!, $cursor: String) {
    user(slug: $slug) {
      paginatedCards(after: $cursor) {
        nodes {
          slug
          userOwnersWithRate {
            from
            price
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

const slug = "soraredata";

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
      // 'APIKEY': '<YourOptionalAPIKey>'
    },
  });

  let cursor = null;
  do {
    console.log("Page starting from cursor", cursor);
    const data = await graphQLClient.request(AllCardsFromUser, {
      slug,
      cursor,
    });
    const paginatedCards = data["user"]["paginatedCards"];
    paginatedCards["nodes"].forEach((card) => {
      console.log(card);
    });
    cursor = paginatedCards["pageInfo"]["endCursor"];
  } while (cursor != null);
}

main().catch((error) => console.error(error));
