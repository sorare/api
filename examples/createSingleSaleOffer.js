const { GraphQLClient, gql } = require("graphql-request");
const { signLimitOrder } = require("@sorare/crypto");
const crypto = require("crypto");
const yargs = require("yargs");

const {
  sendCard,
  sendWei,
  receiveCards,
  receiveWei,
  receiverSlug,
  token,
  jwtAud,
  privateKey,
} = yargs
  .command("createSingleSaleOffer", "Create a single sale offer.")
  .option("send-card", {
    description: "The card slug to send.",
    type: "string",
    required: true,
  })
  .option("send-wei", {
    description: "The amount of ETH to send, in wei.",
    type: "string",
    default: "0",
  })
  .option("receive-cards", {
    description: "The comma-separated list of card slugs to receive.",
    type: "string",
  })
  .option("receive-wei", {
    description: "The amount of ETH to receive, in wei.",
    type: "string",
    default: "0",
  })
  .option("receiver-slug", {
    description: "The receiver slug.",
    type: "string",
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

const NewOfferLimitOrders = gql`
  mutation NewOfferLimitOrders($input: prepareOfferInput!) {
    prepareOffer(input: $input) {
      limitOrders {
        amountBuy
        amountSell
        expirationTimestamp
        nonce
        tokenBuy
        tokenSell
        vaultIdBuy
        vaultIdSell
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
      offer {
        id
      }
      errors {
        message
      }
    }
  }
`;

async function main() {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
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

  const prepareOfferInput = {
    type: "SINGLE_SALE_OFFER",
    sendCardsSlugs: [sendCard],
    receiveCardsSlugs: receiveCards?.split(",") || [],
    sendWeiAmount: sendWei,
    receiveWeiAmount: receiveWei,
    receiverSlug: receiverSlug,
    clientMutationId: crypto.randomBytes(8).join(""),
  };
  console.log(prepareOfferInput);

  const newOfferData = await graphQLClient.request(NewOfferLimitOrders, {
    input: prepareOfferInput,
  });
  console.log(newOfferData);

  const prepareOffer = newOfferData["prepareOffer"];
  if (prepareOffer["errors"].length > 0) {
    prepareOffer["errors"].forEach((error) => {
      console.error(error["message"]);
    });
    process.exit(2);
  }

  const limitOrders = prepareOffer["limitOrders"];
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

  const createSingleSaleOfferInput = {
    starkSignatures,
    dealId: crypto.randomBytes(8).join(""),
    cardSlug: sendCard,
    price: receiveWei,
    clientMutationId: crypto.randomBytes(8).join(""),
  };
  console.log(createSingleSaleOfferInput);
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
