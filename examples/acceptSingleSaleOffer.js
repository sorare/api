const { GraphQLClient, gql } = require("graphql-request");
const { signLimitOrder } = require("@sorare/crypto");
const crypto = require("crypto");
const yargs = require("yargs");

const { offerId, token, jwtAud, privateKey } = yargs
  .command("acceptSingleSaleOffer", "Accept a single sale offer.")
  .option("offer-id", {
    description: "The Offer ID of the offer to accept.",
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

  const PrepareAcceptOffer = gql`
  mutation PrepareAcceptOffer($input: prepareAcceptOfferInput!) {
    prepareAcceptOffer(input: $input) {
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
            feeInfo {
              feeLimit
              tokenId
              sourceVaultId
            }
          }
        }
      }
      errors {
        message
      }
    }
  }
`;

const AcceptSingleSaleOffer = gql`
  mutation AcceptSingleSaleOffer($input: acceptOfferInput!) {
    acceptOffer(input: $input) {
      tokenOffer {
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


  const configData = await graphQLClient.request(Config);
  const exchangeRateId = configData["config"]["exchangeRate"]["id"].replace('ExchangeRate:', '');
  console.log("Using exchange rate id", exchangeRateId);

  const prepareAcceptOfferInput = {
    offerId: `SingleSaleOffer:${offerId}`,
    settlementInfo: {
      currency: "WEI",
      paymentMethod: "WALLET",
      exchangeRateId: exchangeRateId,
    },
  };

  const prepareAcceptOfferData = await graphQLClient.request(PrepareAcceptOffer, {
    input: prepareAcceptOfferInput,
  });
  const prepareAcceptOffer = prepareAcceptOfferData["prepareAcceptOffer"];
  if (prepareAcceptOffer["errors"].length > 0) {
    prepareAcceptOffer["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  const authorizations = prepareAcceptOffer["authorizations"];
  const approvals = authorizations.map((authorization) => ({
    fingerprint: authorization.fingerprint,
    starkexLimitOrderApproval: {
      nonce: authorization.request.nonce,
      expirationTimestamp: authorization.request.expirationTimestamp,
      signature: signLimitOrder(privateKey, authorization.request),
    },
  }));

  const acceptOfferInput = {
    approvals,
    offerId: `SingleSaleOffer:${offerId}`,
    settlementInfo: {
      currency: "WEI",
      paymentMethod: "WALLET",
      exchangeRateId: exchangeRateId,
    },
    clientMutationId: crypto.randomBytes(8).join(""),
  };

  const acceptOfferData = await graphQLClient.request(AcceptSingleSaleOffer, {
    input: acceptOfferInput,
  });

  const acceptOffer = acceptOfferData["acceptOffer"];
  if (acceptOffer["errors"].length > 0) {
    acceptOffer["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  console.log("Success!");
}

main().catch((error) => console.error(error));
