const { GraphQLClient, gql } = require("graphql-request");
const { signLimitOrder } = require("@sorare/crypto");
const crypto = require("crypto");
const yargs = require("yargs");

const { auctionId, token, privateKey, jwtAud } = yargs
  .command(
    "bidAuctionWithEth",
    "Make the minimum next bid on an english auction."
  )
  .option("auctionId", {
    description: "The auction id.",
    type: "string",
    required: true,
  })
  .option("token", {
    description: "The JWT or OAuth token.",
    type: "string",
    required: true,
  })
  .option("private-key", {
    description: "Your Starkware private key",
    type: "string",
    required: true,
  })
  .option("jwt-aud", {
    description: "The JWT audience (required if using a JWT token).",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;


const EnglishAuction = gql`
  query EnglishAuction($auctionId: String!) {
    tokens {
      auction(id: $auctionId) {
        id
        minNextBid
      }
    }
  }
`;

const PrepareBid = gql`
  mutation PrepareBid($input: prepareBidInput!) {
    prepareBid(input: $input) {
      authorizations {
        fingerprint
        request {
          ... on StarkexLimitOrderAuthorizationRequest {
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
      },
      errors {
        message
      }
    }
  }
`;

const Bid = gql`
  mutation Bid($input: bidInput!) {
    bid(input: $input) {
      tokenBid {
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

  const englishAuctionData = await graphQLClient.request(EnglishAuction, {
    auctionId: auctionId,
  });
  const bidAmountInWei = englishAuctionData["tokens"]["auction"]["minNextBid"];
  const auctionGid = englishAuctionData["tokens"]["auction"]["id"];
  console.log("Minimum next bid is", bidAmountInWei, "wei");

  const prepareBidInput = {
    englishAuctionId: auctionId,
    amount: bidAmountInWei,
  }
  const prepareBidData = await graphQLClient.request(
    PrepareBid, { input: prepareBidInput }
  );
  const prepareBid = prepareBidData["prepareBid"];
  if (prepareBid["errors"].length > 0) {
    prepareBid["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  const authorizations = prepareBid["authorizations"];

  const approvals = authorizations.map((authorization) => ({
    fingerprint: authorization.fingerprint,
    starkexLimitOrderApproval: {
      nonce: authorization.request.nonce,
      expirationTimestamp: authorization.request.expirationTimestamp,
      signature: signLimitOrder(privateKey, authorization.request),
    },
  }));

  const bidInput = {
    approvals,
    auctionId: auctionGid,
    amount: bidAmountInWei,
    clientMutationId: crypto.randomBytes(8).join(""),
  };

  const bidData = await graphQLClient.request(Bid, { input: bidInput });
  console.log(bidData);

  const bid = bidData["bid"];
  if (bid["errors"].length > 0) {
    bid["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  console.log("Success!");
}

main().catch((error) => console.error(error));
