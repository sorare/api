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

  const Config = gql`
    query ConfigQuery {
      config {
        exchangeRate {
          id
        }
      }
    }
  `;

const EnglishAuction = gql`
  query EnglishAuction($auctionId: String!) {
    tokens {
      auction(id: $auctionId) {
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
  const graphQLClient = new GraphQLClient("https://api.sorare.dev/federation/graphql", {
    headers: {
      Authorization: `Bearer ${token}`,
      "JWT-AUD": jwtAud,
      // 'APIKEY': '<YourOptionalAPIKey>'
    },
  });

  const configData = await graphQLClient.request(Config);
  const exchangeRateId = configData["config"]["exchangeRate"]["id"].replace('ExchangeRate:', '');
  console.log("Using exchange rate id", exchangeRateId);

  const englishAuctionData = await graphQLClient.request(EnglishAuction, {
    auctionId: auctionId,
  });
  const bidAmountInWei = englishAuctionData["tokens"]["auction"]["minNextBid"];
  console.log("Minimum next bid is", bidAmountInWei, "wei");

  const prepareBidInput = {
    englishAuctionId: auctionId,
    amount: bidAmountInWei,
    settlementInfo: {
      currency: "WEI",
      paymentMethod: "WALLET",
      exchangeRateId: exchangeRateId,
    },
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
    auctionId: `EnglishAuction:${auctionId}`,
    amount: bidAmountInWei,
    settlementInfo: {
      currency: "WEI",
      paymentMethod: "WALLET",
      exchangeRateId: exchangeRateId,
    },
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
