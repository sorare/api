const { ActionCable } = require('@sorare/actioncable');

const cable = new ActionCable({
  headers: {
    // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
    // 'APIKEY': '<YourOptionalAPIKey>'
  }
});

const tokenOfferWasUpdated = `tokenOfferWasUpdated {
  status
  actualReceiver {
    ... on User {
      slug
    }
  }
  sender {
    ... on User {
      slug
    }
  }
  senderSide {
    amounts {
      wei
      eur
      usd
      gbp
    }
    anyCards {
      assetId
    }
  }
  receiverSide {
    amounts {
      wei
      eur
      usd
      gbp
    }
    anyCards {
      assetId
    }
  }
}
`;

const tokenAuctionWasUpdated = `tokenAuctionWasUpdated {
  open
  bestBid {
    amounts {
      wei
      eur
      usd
      gbp
    }
    bidder {
      ... on User {
        slug
      }
    }
  }
  bids {
    nodes {
      amounts {
        wei
        eur
        usd
        gbp
      }
      bidder {
        ... on User {
          slug
        }
      }
    }
  }
  anyCards {
    assetId
  }
}
`;

cable.subscribe(tokenOfferWasUpdated, {
  connected() {
    console.log("connected");
  },

  disconnected(error) {
    console.log("disconnected", error);
  },

  rejected(error) {
    console.log("rejected", error);
  },

  received(data) {
    if (data?.result?.errors?.length > 0) {
      console.log('error', data?.result?.errors);
      return;
    }
    const tokenOffer = data?.result?.data;
    console.log('a token offer was updated', tokenOffer);
  }
});

cable.subscribe(tokenAuctionWasUpdated, {
  connected() {
    console.log("connected");
  },

  disconnected(error) {
    console.log("disconnected", error);
  },

  rejected(error) {
    console.log("rejected", error);
  },

  received(data) {
    if (data?.result?.errors?.length > 0) {
      console.log('error', data?.result?.errors);
      return;
    }
    const tokenOffer = data?.result?.data;
    console.log('a token auction was updated', tokenOffer);
  }
});
