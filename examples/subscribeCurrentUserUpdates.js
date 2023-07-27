const { ActionCable } = require('@sorare/actioncable');

const token = process.env['JWT_TOKEN'];
const jwtAud = process.env['JWT_AUD'];

if (!token) {
  throw new Error('Missing JWT_TOKEN environment variable');
}

if (!jwtAud) {
  throw new Error('Missing JWT_AUD environment variable');
}

const cable = new ActionCable({
  headers: {
    'Authorization': `Bearer ${token}`,
    'JWT-AUD': jwtAud,
  }
});

cable.subscribe('currentUserWasUpdated { slug nickname }', {
  connected() {
    console.log("connected");
  },

  disconnected(error) {
    console.log("disconnected", error);
    process.exit(1);
  },

  rejected(error) {
    console.log("rejected", error);
    process.exit(1);
  },

  received(data) {
    if (data?.result?.errors?.length > 0) {
      console.log('error', data?.result?.errors);
      process.exit(1);
      return;
    }
    const currentUserWasUpdated = data?.result?.data?.currentUserWasUpdated;
    if (!currentUserWasUpdated) {
      return;
    }
    const { slug } = currentUserWasUpdated;
    console.log('current user was updated', slug);
    process.exit(0);
  }
});
