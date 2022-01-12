const { ActionCable } = require('@sorare/actioncable');

const cable = new ActionCable({
  headers: {
    // 'Authorization': `Bearer <YourJWTorOAuthToken>`,
    // 'APIKEY': '<YourOptionalAPIKey>'
  }
});

cable.subscribe('aCardWasUpdated { slug }', {
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
    const aCardWasUpdated = data?.result?.data?.aCardWasUpdated;
    if (!aCardWasUpdated) {
      return;
    }
    const { slug } = aCardWasUpdated;
    console.log('a card was updated', slug);
  }
});

cable.subscribe('bundledAuctionWasUpdated { id }', {
  received(data) {
    const bundledAuctionWasUpdated = data?.result?.data?.bundledAuctionWasUpdated;
    if (!bundledAuctionWasUpdated) {
      return;
    }
    const { id } = bundledAuctionWasUpdated;
    console.log('a bundled auction was updated', id);
  }
});
