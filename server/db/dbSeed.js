const { dbConnect, dbDisconnect } = require('./db');
const User = require('./models/PlayerModel');
const faker = require('faker');
dbConnect();

const seed = async () => {
  const playersArr = [];
  for (let i = 0; i < 10; i++) {
    playersArr.push(
      await User.create({
        username: faker.name.findName(),
        property: {
          fracrion: 'Human',
        },
        resorсes: {
          crystals: 0,
          gold: 0,
        },
        gifts: [],
      })
    );
  }
};
seed().then(() => dbDisconnect());
