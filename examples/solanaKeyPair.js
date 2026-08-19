// Deriving your Solana key pair from your Sorare private key.
//
// Solana authorization requests (`SolanaTokenTransferAuthorizationRequest` and
// `SolanaBankTransferAuthorizationRequest`) must be signed with your Solana key
// pair. You never export that key pair from sorare.com directly: it is derived
// deterministically from the Sorare (Ethereum) private key you export from your
// wallet (see the "Examples" section of the top-level README).
//
// The derivation is standard SLIP-0010:
//   - the Ethereum private key bytes are used as the HD master seed
//   - the derivation path is m/44'/501'/0'/0' (the standard Solana path)
//   - the derived private key bytes give an ed25519 key pair
//
// The address of the derived key pair is the `senderAddress` returned in the
// authorization request. Comparing the two is the fastest way to confirm your
// derivation is correct before you start debugging signatures.

const {
  createKeyPairFromPrivateKeyBytes,
  createSignerFromKeyPair,
} = require('@solana/kit');
const { HDKey } = require('micro-key-producer/slip10.js');

const SOLANA_DERIVATION_PATH = "m/44'/501'/0'/0'";

// `ethereumPrivateKey` is the private key exported from sorare.com, with or
// without the leading `0x`.
const deriveSolanaSigner = async ethereumPrivateKey => {
  const seed = Buffer.from(ethereumPrivateKey.replace(/^0x/, ''), 'hex');
  const { privateKey: derivedPrivateKeyBytes } = HDKey.fromMasterSeed(
    seed
  ).derive(SOLANA_DERIVATION_PATH);

  const keyPair = await createKeyPairFromPrivateKeyBytes(
    derivedPrivateKeyBytes
  );

  return createSignerFromKeyPair(keyPair);
};

module.exports = { deriveSolanaSigner, SOLANA_DERIVATION_PATH };

// Running this file prints the derived Solana address. Check it against the
// `senderAddress` of the authorization request you are trying to sign: if they
// differ, the problem is the derivation, not the signature.
if (require.main === module) {
  const ethereumPrivateKey =
    '0xa9405b77d085276e4b6e35cf494e83f0533d4751fc13e2fdceb6229330ef5146';

  deriveSolanaSigner(ethereumPrivateKey).then(signer => {
    // Prints 8ixw6XQW2tuZhc1xgbhh6bq6YvL5K5nXLsN9LjrzMrxq, which is the
    // `senderAddress` of the request in solanaBankTransfer.js.
    console.log(signer.address);
  });
}
