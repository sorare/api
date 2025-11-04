const {
  createKeyPairFromBytes,
  createSignerFromKeyPair,
  createSignableMessage,
  getBase58Encoder,
  getBase58Decoder,
} = require('@solana/kit');

const privateKey =
  '4GRjpWvrbUcLRbhrBnTYdfcuJbkxoHprF1yTPhjyHWgMAo7H34pEuDeB1TYw1QdGHgQnKs8MRadRdfiU5GDNtELq';

const solanaBankTransferAuthorizationRequest = {
  __typename: 'AuthorizationRequest',
  fingerprint: '75c29086c8535042f74030ceef7be72d',
  id: 'TokenService::Core::SolanaBankTransferAuthorization:d25f2cfc-bb1e-40ca-b72c-76d3d04c7135',
  request: {
    __typename: 'SolanaBankTransferAuthorizationRequest',
    authority: 'C2C7r9XqyTUTQEgeEtuyxsjdTRQ88Hn5sFRdTzmhmPTz',
    amount: '25000000',
    programAddress: '8JbCYE7Zobe45cbbHZYKF87bbJQ54oCowuAbB9QzSUxh',
    expirationTimestamp: 1763476014,
    feeAmount: '0',
    nonce: '2',
    originator: 'Dv8A8XKBz5QARFKZ5Kewdk8myCDcne9wiD7ULTanHKU',
    receiverAddress: '2kW2HNBKLtvexM8mTX4r5UqT1Hsn1k5XTvYxq9LfzD1g',
    senderAddress: '8ixw6XQW2tuZhc1xgbhh6bq6YvL5K5nXLsN9LjrzMrxq',
  },
};

const {
  authority,
  amount,
  programAddress,
  expirationTimestamp,
  feeAmount,
  nonce,
  originator,
  receiverAddress,
  senderAddress,
} = solanaBankTransferAuthorizationRequest.request;

const message = [
  'TRANSFER_SOL',
  programAddress,
  authority,
  senderAddress,
  receiverAddress,
  amount,
  feeAmount,
  nonce,
  expirationTimestamp,
  '0x',
  originator,
].join(':');

const textEncoder = new TextEncoder();
const messageBytes = textEncoder.encode(message);

async function signRequest() {
  const secretKeyBytes = getBase58Encoder().encode(privateKey)
  const keyPair = await createKeyPairFromBytes(secretKeyBytes)
  const signer = await createSignerFromKeyPair(
    keyPair
  );
  const messageHash = await crypto.subtle.digest('SHA-256', messageBytes);
  const mess = createSignableMessage(new Uint8Array(messageHash));
  const [ret] = await signer.signMessages([mess]);
  const signature = getBase58Decoder().decode(ret['8ixw6XQW2tuZhc1xgbhh6bq6YvL5K5nXLsN9LjrzMrxq']);

  const approval = {
    fingerprint: solanaBankTransferAuthorizationRequest.fingerprint,
    solanaBankTransferApproval: {
      signature,
      expirationTimestamp,
      nonce,
    },
  };

  console.log(approval);
}

// expected signature: 4dEdXR9D5Pp6QEdQX5uHRYPouWUqZPmRUoSsTjgxXt2FuzN4X5NsvTNAEDoofjgWshg4jisDaxhFEpy5Q97EsLxA
signRequest();
