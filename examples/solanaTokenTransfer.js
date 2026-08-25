// Signing a `SolanaTokenTransferAuthorizationRequest`.
//
// This is the authorization request you get from `prepareOffer` (SINGLE_SALE_OFFER
// and DIRECT_OFFER) and from `prepareAcceptOffer` when the card you are sending
// lives on Solana. It authorises the Transfer Proxy program to move one Player
// Card, and it is signed with your Solana key pair — not with your Starkware key
// and not with `@sorare/crypto`, which only supports StarkEx.
//
// See solanaKeyPair.js for where the Solana key pair comes from.

const {
  createSignableMessage,
  getBase58Decoder,
} = require('@solana/kit');
const { deriveSolanaSigner } = require('./solanaKeyPair');

// The Sorare private key exported from your wallet on sorare.com.
const ethereumPrivateKey =
  '0xa9405b77d085276e4b6e35cf494e83f0533d4751fc13e2fdceb6229330ef5146';

const solanaTokenTransferAuthorizationRequest = {
  __typename: 'AuthorizationRequest',
  fingerprint: 'd4d0f9558d2f58cad7ebbed5a92edc49',
  request: {
    __typename: 'SolanaTokenTransferAuthorizationRequest',
    assetId:
      '0x04002c8934c7fadd5a832a693b8a9d295a915fb1d0c2250d824ae18e7c5bba7a',
    leafIndex: 5,
    merkleTreeAddress: 'CS7kYFjkSW9iPmCZpmNv5jwyE9FmLzR95ag2bpwtM8uF',
    originator: 'Dv8A8XKBz5QARFKZ5Kewdk8myCDcne9wiD7ULTanHKU',
    receiverAddress: 'cZq5d4nCqUJoysDh49TPRBSXgFx5dsP9Ho4PVJgYEDY',
    senderAddress: '8ixw6XQW2tuZhc1xgbhh6bq6YvL5K5nXLsN9LjrzMrxq',
    expirationTimestamp: 1763482762,
    nonce: '3',
    transferProxyProgramAddress: 'Gz9o1yxV5kVfyC53fFu7StTVeetPZWa2sohzvxJiLxMP',
  },
};

const {
  leafIndex,
  merkleTreeAddress,
  originator,
  receiverAddress,
  senderAddress,
  expirationTimestamp,
  nonce,
  transferProxyProgramAddress,
} = solanaTokenTransferAuthorizationRequest.request;

// Note what is, and is not, part of the signed message:
//   - `assetId` is NOT signed. The card is identified on chain by
//     `merkleTreeAddress` + `leafIndex`, even though `assetId` is returned in the
//     request so you can tell which card it is.
//   - `senderAddress` is NOT signed either: it is implied by the signing key.
//   - `transferProxyProgramAddress` and `originator` ARE signed.
//   - `'0x'` is a literal empty data field. It is not a placeholder to substitute.
// Getting any of this wrong produces a well-formed signature that is always
// rejected, with no clue as to why.
const message = [
  'TRANSFER',
  transferProxyProgramAddress,
  merkleTreeAddress,
  leafIndex.toString(),
  nonce,
  expirationTimestamp.toString(),
  receiverAddress,
  '0x',
  originator,
].join(':');

const textEncoder = new TextEncoder();
const messageBytes = textEncoder.encode(message);

async function signRequest() {
  const signer = await deriveSolanaSigner(ethereumPrivateKey);

  // The derived address is the `senderAddress` of the request. If this throws,
  // your derivation is wrong and there is no point debugging the signature.
  if (signer.address !== senderAddress) {
    throw new Error(
      `Derived ${signer.address} but the request is for ${senderAddress}`
    );
  }

  // You sign the SHA-256 hash of the message, not the message itself.
  const messageHash = await crypto.subtle.digest('SHA-256', messageBytes);
  const signableMessage = createSignableMessage(new Uint8Array(messageHash));
  const [signatures] = await signer.signMessages([signableMessage]);
  const signature = getBase58Decoder().decode(signatures[signer.address]);

  // `nonce` and `expirationTimestamp` are echoed back unchanged from the
  // request: both are part of the signed message, so any other value invalidates
  // the signature.
  const approval = {
    fingerprint: solanaTokenTransferAuthorizationRequest.fingerprint,
    solanaTokenTransferApproval: {
      signature, // Base58 string
      nonce, // String holding a uint32
      expirationTimestamp, // Int, unix seconds
    },
  };

  console.log(approval);
}

signRequest();
