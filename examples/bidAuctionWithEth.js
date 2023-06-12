const { GraphQLClient, gql } = require("graphql-request");
const { signLimitOrder } = require("@sorare/crypto");
const crypto = require("crypto");
const yargs = require("yargs");

const { auction, token, jwtAud, privateKey } = yargs
  .command(
    "bidAuctionWithEth",
    "Make the minimum next bid on an english auction."
  )
  .option("auction", {
    description: "The auction slug.",
    type: "string",
    required: true,
  })
  .option("token", {
    description: "The JWT or OAuth token.",
    type: "string",
    required: true,
  })
  .option("private-key", {
    description: "Your Sorare private key",
    type: "string",
    required: true,
  })
  .option("jwt-aud", {
    description: "The JWT audience (required if using a JWT token).",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

const CurrentUser = gql`
  query CurentUserQuery {
    currentUser {
      starkKey
    }
  }
`;

const EnglishAuction = gql`
  query EnglishAuctionLimitOrder($auctionSlug: String!) {
    englishAuction(slug: $auctionSlug) {
      id
      minNextBid
      blockchainId
    }
  }
`;

const EnglishAuctionLimitOrder = gql`
  mutation PrepareBid($input: prepareBidInput!) {
    prepareBid(input: $input) {
      limitOrders {
        vaultIdSell
        vaultIdBuy
        amountSell
        amountBuy
        tokenSell
        tokenBuy
        nonce
        expirationTimestamp
      }
    }
  }
`;

const Bid = gql`
  mutation Bid($input: bidInput!) {
    bid(input: $input) {
      bid {
        id
      }
      errors {
        message
      }
    }
  }
`;

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/federation/graphql", {
    headers: {
      Authorization: `Bearer ${token}`,
      "JWT-AUD": jwtAud,
      // 'APIKEY': '<YourOptionalAPIKey>'
    },
  });

  const currentUserData = await graphQLClient.request(CurrentUser);
  console.log(currentUserData);
  const starkKey = currentUserData["currentUser"]["starkKey"];
  console.log("Your starkKey is", starkKey);

  const englishAuctionData = await graphQLClient.request(EnglishAuction, {
    auctionSlug: auction,
  });
  const englishAuction = englishAuctionData["englishAuction"];
  const bidAmountInWei = englishAuction["minNextBid"];
  console.log("Minimum next bid is", bidAmountInWei, "wei");

  const prepareBidInput = {
    englishAuctionId: englishAuction["blockchainId"],
    bidAmountWei: bidAmountInWei,
  }
  const limitOrdersData = await graphQLClient.request(
    EnglishAuctionLimitOrder, { input: prepareBidInput }
  );
  const limitOrders = limitOrdersData["prepareBid"]["limitOrders"];
  if (!limitOrders) {
    console.error("You need to be authenticated to get LimitOrders.");
    process.exit(1);
  }
  console.log(limitOrders);

  const starkSignatures = limitOrders.map((limitOrder) => ({
    data: JSON.stringify(signLimitOrder(privateKey, limitOrder)),
    nonce: limitOrder.nonce,
    expirationTimestamp: limitOrder.expirationTimestamp,
    starkKey,
  }));
  console.log(starkSignatures);

  const bidInput = {
    starkSignatures,
    auctionId: englishAuction["id"],
    amount: bidAmountInWei,
    clientMutationId: crypto.randomBytes(8).join(""),
  };
  const bidData = await graphQLClient.request(Bid, { input: bidInput });
  const bid = bidData["bid"];
  console.log(bidData);

  if (bid["errors"].length > 0) {
    bid["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  console.log("Success!");
}

main().catch((error) => {
  if (error?.response?.status == 404) {
    console.log(`EnglishAuction '${auctionSlug}' doesn't exist.`);
    process.exit(2);
  }
  console.error(error);
});
