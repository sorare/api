const { GraphQLClient, gql } = require("graphql-request");
const { signLimitOrder } = require("@sorare/crypto");
const crypto = require("crypto");
const yargs = require("yargs");

const { sendAssetId, receiveWei, token, privateKey, jwtAud} = yargs
  .command("createSingleSaleOffer", "Create a single sale offer.")
  .option("send-asset-id", {
    description: "The assetId to send.",
    type: "string",
    required: true,
  })
  .option("receive-wei", {
    description: "The amount of ETH to receive, in wei.",
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


const PrepareOffer = gql`
  mutation PrepareOffer($input: prepareOfferInput!) {
    prepareOffer(input: $input) {
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

const CreateSingleSaleOffer = gql`
  mutation CreateSingleSaleOffer($input: createSingleSaleOfferInput!) {
    createSingleSaleOffer(input: $input) {
      tokenOffer {
        id
        startDate
        endDate
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

  const prepareOfferInput = {
    type: "SINGLE_SALE_OFFER",
    sendAssetIds: [sendAssetId],
    receiveAssetIds: [],
    receiveAmount: {
      amount: receiveWei,
      currency: "WEI",
    },
    clientMutationId: crypto.randomBytes(8).join(""),
  };

  const prepareOfferData = await graphQLClient.request(PrepareOffer, {
    input: prepareOfferInput,
  });
  const prepareOffer = prepareOfferData["prepareOffer"];
  if (prepareOffer["errors"].length > 0) {
    prepareOffer["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  const authorizations = prepareOffer["authorizations"];
  const approvals = authorizations.map((authorization) => ({
    fingerprint: authorization.fingerprint,
    starkexLimitOrderApproval: {
      nonce: authorization.request.nonce,
      expirationTimestamp: authorization.request.expirationTimestamp,
      signature: signLimitOrder(privateKey, authorization.request),
    },
  }));

  const createSingleSaleOfferInput = {
    approvals,
    dealId: crypto.randomBytes(8).join(""),
    assetId: sendAssetId,
    receiveAmount: { amount: receiveWei, currency: "WEI" },
    clientMutationId: crypto.randomBytes(8).join(""),
  };
  const createSingleSaleOfferData = await graphQLClient.request(
    CreateSingleSaleOffer,
    { input: createSingleSaleOfferInput }
  );
  console.log(createSingleSaleOfferData);

  const createSingleSaleOffer =
    createSingleSaleOfferData["createSingleSaleOffer"];

  if (createSingleSaleOffer["errors"].length > 0) {
    createSingleSaleOffer["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  console.log("Success!");
}

main().catch((error) => console.error(error));
