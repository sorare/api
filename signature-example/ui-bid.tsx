const BID_MUTATION = gql`
  mutation Bid($input: bidInput!) {
    bid(input: $input) {
      bid {
        englishAuction {
          ... on EnglishAuctionInterface {
            slug
            bidsCount
            currentPrice
            ...UseBestBidBelongsToUser_auction
          }
        }
      }
      errors {
        path
        message
      }
    }
  }
  ${useBestBidBelongsToUser.fragments.auction}
`;

const bidWithBankEth = async () => {
  const signature = await signSettleDeal(
    deal,
    SettleDealSignatureType.ReceiveETH,
    bidAmountInWei.toString()
  );

  const result = await bid({
    variables: {
      input: {
        auctionId: id,
        amount: bidAmountInWei.toString(),
        signature
      }
    }
  });

  return { err: errors };
};