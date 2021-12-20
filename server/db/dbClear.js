const { dbConnect, dbDisconnect } = require('./db');
const User = require('./models/PlayerModel');

dbConnect();
export const deleteAll = async () => {
  await User.deleteMany();
  await User.create({
    _id: '61b3721858b892d97e7171be',
    username: 'Test User',
    property: {
      fracrion: 'Human',
    },
    resorсes: {
      crystals: 0,
      gold: 0,
    },

    gifts: [],
  });
};

deleteAll().then(() => dbDisconnect());
