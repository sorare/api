const { gql } = require('graphql-request');
const { signAuthorizationRequest } = require('@sorare/crypto');

export const authorizationRequestFragment = gql`
  fragment AuthorizationRequestFragment on AuthorizationRequest {
    fingerprint
    request {
      __typename
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
      ... on StarkexTransferAuthorizationRequest {
        amount
        condition
        expirationTimestamp
        feeInfoUser {
          feeLimit
          sourceVaultId
          tokenId
        }
        nonce
        receiverPublicKey
        receiverVaultId
        senderVaultId
        token
      }
      ... on MangopayWalletTransferAuthorizationRequest {
        nonce
        amount
        currency
        operationHash
        mangopayWalletId
      }
    }
  }
`;

const buildApproval = (privateKey, fingerprint, authorizationRequest) => {
  const signature = signAuthorizationRequest(privateKey, authorizationRequest);
  if (
    authorizationRequest.__typename == 'StarkexTransferAuthorizationRequest'
  ) {
    return {
      fingerprint,
      starkexTransferApproval: {
        nonce: authorizationRequest.nonce,
        expirationTimestamp: authorizationRequest.expirationTimestamp,
        signature,
      },
    };
  }
  if (
    authorizationRequest.__typename == 'StarkexLimitOrderAuthorizationRequest'
  ) {
    return {
      fingerprint,
      starkexLimitOrderApproval: {
        nonce: authorizationRequest.nonce,
        expirationTimestamp: authorizationRequest.expirationTimestamp,
        signature,
      },
    };
  }
  if (
    authorizationRequest.__typename ==
    'MangopayWalletTransferAuthorizationRequest'
  ) {
    return {
      fingerprint,
      mangopayWalletTransferApproval: {
        nonce: authorizationRequest.nonce,
        signature,
      },
    };
  }

  throw new Error('Unknown authorization request type');
};

export const buildApprovals = authorizations => {
  return authorizations.map(authorization =>
    buildApproval(privateKey, authorization.fingerprint, authorization.request)
  );
};
