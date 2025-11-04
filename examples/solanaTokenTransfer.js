const {
  createKeyPairFromBytes,
  createSignerFromKeyPair,
  createSignableMessage,
  getBase58Encoder,
  getBase58Decoder,
} = require('@solana/kit');

const privateKey = '2KGrum1o5ZudshxeUDjKesA5hvyGvHeqaUet6BMUhb8zi7eCT9ifgCBFYWYTn2o8oM5js2FCs2aHj6ABDLfP8vaA'

const solanaTokenTransferAuthorizationRequest = {
  __typename: "AuthorizationRequest",
  fingerprint: "d4d0f9558d2f58cad7ebbed5a92edc49",
  request: {
      __typename: "SolanaTokenTransferAuthorizationRequest",
      leafIndex: 5,
      merkleTreeAddress: "CS7kYFjkSW9iPmCZpmNv5jwyE9FmLzR95ag2bpwtM8uF",
      originator: "Dv8A8XKBz5QARFKZ5Kewdk8myCDcne9wiD7ULTanHKU",
      receiverAddress: "cZq5d4nCqUJoysDh49TPRBSXgFx5dsP9Ho4PVJgYEDY",
      expirationTimestamp: 1763482762,
      nonce: "3",
      transferProxyProgramAddress: "Gz9o1yxV5kVfyC53fFu7StTVeetPZWa2sohzvxJiLxMP"
  }
}

const {
  leafIndex,
  merkleTreeAddress,
  originator,
  receiverAddress,
  expirationTimestamp,
  nonce,
  transferProxyProgramAddress,
} = solanaTokenTransferAuthorizationRequest.request;

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
  const secretKeyBytes = getBase58Encoder().encode(privateKey)
  const keyPair = await createKeyPairFromBytes(secretKeyBytes)
  const signer = await createSignerFromKeyPair(
    keyPair
  );
  const messageHash = await crypto.subtle.digest('SHA-256', messageBytes);
  const mess = createSignableMessage(new Uint8Array(messageHash));
  const [ret] = await signer.signMessages([mess]);
  const signature = getBase58Decoder().decode(ret['BvJrHm3rBx9ddmz4dzK4Jp8ibC8WSfYP5qipE7M1CbDx']);

  const approval = {
    fingerprint: solanaTokenTransferAuthorizationRequest.fingerprint,
    solanaBankTransferApproval: {
      signature,
      expirationTimestamp,
      nonce,
    },
  };

  console.log(approval);
}

// expected signature: 4aR7f1eaVbBfxQze5vgktZ18RP1tUYB28yiaRTBJDPgtpe4kcvAcMq3QM6C8HPTzVTS9RYxj9XdrwmGnpU52Fc5n
signRequest();