import { GraphQLClient, gql } from 'graphql-request';
import crypto from 'crypto';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  authorizationRequestFragment,
  buildApprovals,
} from './authorizations.js';

const argv = yargs(hideBin(process.argv))
  .command(
    'bidAuctionWithEth',
    'Make the minimum next bid on an english auction.'
  )
  .option('auctionId', {
    description: 'The auction id with "EnglishAuction:" prefix.',
    type: 'string',
    demandOption: true,
  })
  .option('token', {
    description: 'The JWT or OAuth token.',
    type: 'string',
    demandOption: true,
  })
  .option('private-key', {
    description: 'Your Starkware private key',
    type: 'string',
    demandOption: true,
  })
  .option('jwt-aud', {
    description: 'The JWT audience (required if using a JWT token).',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .parse();

const { auctionId: auctionUuid, token, privateKey, jwtAud } = argv;

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
        ...AuthorizationRequestFragment
      }
      errors {
        message
      }
    }
  }
  ${authorizationRequestFragment}
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
  const graphQLClient = new GraphQLClient(
    'https://api.sorare.com/graphql',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'JWT-AUD': jwtAud,
        'APIKEY': token
      },
    }
  );

  const configData = await graphQLClient.request(Config);

  const exchangeRateId = configData['config']['exchangeRate']['id'];

  const englishAuctionData = await graphQLClient.request(EnglishAuction, {
    auctionId: auctionUuid.replace("EnglishAuction:", ""), // to search not use prefix
  });
  const bidAmountInWei = englishAuctionData['tokens']['auction']['minNextBid'];

  const prepareBidInput = {
    auctionId: auctionUuid, // to bid, use prefix
    amount: bidAmountInWei,
    settlementInfo: {
      currency: 'WEI',
      paymentMethod: 'WALLET',
      exchangeRateId: exchangeRateId,
    },
  };


  const prepareBidData = await graphQLClient.request(PrepareBid, {
    input: prepareBidInput,
  });

  const prepareBid = prepareBidData['prepareBid'];
  if (prepareBid['errors'] && prepareBid['errors'].length > 0) {
    prepareBid['errors'].forEach(error => {
      console.error(error['message']);
    });
    process.exit(2);
  }

  const authorizations = prepareBid['authorizations'];
  const approvals = buildApprovals(privateKey, authorizations);

  const bidInput = {
    approvals,
    auctionId: auctionUuid,
    amount: bidAmountInWei,
    settlementInfo: {
      currency: 'WEI',
      paymentMethod: 'WALLET',
      exchangeRateId: exchangeRateId,
    },
    clientMutationId: crypto.randomBytes(8).join(''),
  };

  const bidData = await graphQLClient.request(Bid, { input: bidInput });
  console.log(bidData);

  const bid = bidData['bid'];
  if (bid['errors'] && bid['errors'].length > 0) {
    bid['errors'].forEach(error => {
      console.error(error['message']);
    });
    process.exit(2);
  }

}

main().catch(error => {
    console.error(error)
});
