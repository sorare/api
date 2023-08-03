const { GraphQLClient, gql } = require('graphql-request');
const { signAuthorizationRequest } = require('@sorare/crypto');
const crypto = require('crypto');
const yargs = require('yargs');

import {
  authorizationRequestFragment,
  buildApprovals,
} from '../authorizations';

const {
  sendAssetId,
  settlementCurrencies,
  receiveCurrency,
  receiveAmount,
  token,
  privateKey,
  jwtAud,
} = yargs
  .command('createSingleSaleOffer', 'Create a single sale offer.')
  .option('send-asset-id', {
    description: 'The assetId to send.',
    type: 'string',
    required: true,
  })
  .option('settlement-currencies', {
    description:
      'The currencies in which the offer can settle, any combination of WEI and your fiat wallet currency',
    type: 'array',
    required: true,
  })
  .option('receive-currency', {
    description: 'One of WEI, EUR, USD, GBP',
    type: 'string',
    required: true,
  })
  .option('receive-amount', {
    description:
      'The amount to receive in the currency smallest denomination, cents for FIAT and wei for ETH',
    type: 'string',
    required: true,
  })
  .option('token', {
    description: 'The JWT or OAuth token.',
    type: 'string',
    required: true,
  })
  .option('private-key', {
    description: 'Your Sorare private key',
    type: 'string',
    required: true,
  })
  .option('jwt-aud', {
    description: 'The JWT audience (required if using a JWT token).',
    type: 'string',
  })
  .help()
  .alias('help', 'h').argv;

const PrepareOffer = gql`
  mutation PrepareOffer($input: prepareOfferInput!) {
    prepareOffer(input: $input) {
      authorizations {
        ...AuthorizationRequestFragment
      }
      errors {
        message
      }
    }
  }
  ${authorizationRequestFragment}
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
  const graphQLClient = new GraphQLClient(
    'https://api.sorare.com/federation/graphql',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'JWT-AUD': jwtAud,
        // 'APIKEY': '<YourOptionalAPIKey>'
      },
    }
  );

  const prepareOfferInput = {
    type: 'SINGLE_SALE_OFFER',
    sendAssetIds: [sendAssetId],
    receiveAssetIds: [],
    settlementCurrencies,
    receiveAmount: {
      amount: receiveAmount,
      currency: receiveCurrency,
    },
    clientMutationId: crypto.randomBytes(8).join(''),
  };

  const prepareOfferData = await graphQLClient.request(PrepareOffer, {
    input: prepareOfferInput,
  });
  const prepareOffer = prepareOfferData['prepareOffer'];
  if (prepareOffer['errors'].length > 0) {
    prepareOffer['errors'].forEach(error => {
      console.error(error['message']);
    });
    process.exit(2);
  }

  const authorizations = prepareOffer['authorizations'];
  const approvals = buildApprovals(privateKey, authorizations);

  const createSingleSaleOfferInput = {
    approvals,
    dealId: crypto.randomBytes(8).join(''),
    assetId: sendAssetId,
    settlementCurrencies,
    receiveAmount: { amount: receiveAmount, currency: receiveCurrency },
    clientMutationId: crypto.randomBytes(8).join(''),
  };
  const createSingleSaleOfferData = await graphQLClient.request(
    CreateSingleSaleOffer,
    { input: createSingleSaleOfferInput }
  );
  console.log(createSingleSaleOfferData);

  const createSingleSaleOffer =
    createSingleSaleOfferData['createSingleSaleOffer'];

  if (createSingleSaleOffer['errors'].length > 0) {
    createSingleSaleOffer['errors'].forEach(error => {
      console.error(error['message']);
    });
    process.exit(2);
  }

  console.log('Success!');
}

main().catch(error => console.error(error));
