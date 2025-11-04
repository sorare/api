const {
  encodeAbiParameters,
  encodePacked,
  keccak256,
} = require('viem');
const { privateKeyToAccount } = require('viem/accounts');

const privateKey = '0xa9405b77d085276e4b6e35cf494e83f0533d4751fc13e2fdceb6229330ef5146';

const ethereumBankTransferAuthorizationRequest = {
  __typename: 'AuthorizationRequest',
  fingerprint: '982b3760a853eaa1eb3b356ff6431f24',
  request: {
    __typename: 'EthereumBankTransferAuthorizationRequest',
    contractAddress: '0xC887caC5924033340bdd4dd97812738824bCf989',
    deadline: '1763474595',
    amount: '1000000000000000',
    feeAmount: '0',
    proxyAddress: '0x0000000000000000000000000000000000000000',
    receiverAddress: '0xABd4c585d69Fe6fC7380Ad0bE9a9D932Ba74F709',
    salt: '0x1b6de9fc32e321756431d71322b1c4ed7e45ea1199b7e278dcbc8547bdc7235f',
    senderAddress: '0xB1a1ed82d0C7DC3f3bA7e2b2613328c64e9d9dA3',
  },
};

const {
  senderAddress,
  receiverAddress,
  amount,
  feeAmount,
  deadline,
  salt,
  proxyAddress,
  contractAddress,
} = ethereumBankTransferAuthorizationRequest.request;

const message = encodeAbiParameters(
  [
    { type: 'address' },
    { type: 'address' },
    { type: 'uint256' },
    { type: 'uint256' },
    { type: 'uint64' },
    { type: 'bytes32' },
    { type: 'address' },
    { type: 'bytes' },
    { type: 'address' },
  ],
  [
    senderAddress,
    receiverAddress,
    amount,
    feeAmount,
    deadline,
    salt,
    proxyAddress,
    '0x',
    contractAddress,
  ]
);

const messagHash = encodePacked(['bytes'], [keccak256(message)]);
const account = privateKeyToAccount(privateKey);

async function signRequest() {
  const signature = await account.signMessage({
    message: { raw: messagHash },
  })

  const approval = {
    fingerprint: ethereumBankTransferAuthorizationRequest.fingerprint,
    ethereumBankTransferApproval: {
      signature,
      deadline,
      salt,
    },
  };

  console.log({ approval });
}

// expected signature: 0xc503f3f479dfc8c2a76ca8cdf336b0a270cda0ae407fe5270a87b7cdacd2efb8046ccb6e31a7853e22a7541b67f2c49a6ae8cf006673ed17d6995aeb3e624fbf1c
signRequest();

