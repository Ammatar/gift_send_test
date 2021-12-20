const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/dominiGames';

const dbConnect = () => {
  mongoose.connect(dbUri, () => {
    console.log('Db connect');
  });
};
const dbDisconnect = () => {
  mongoose.disconnect(() => {
    console.log('Db disconnect');
  });
};
module.exports = { dbConnect, dbDisconnect };
