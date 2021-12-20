const mongoose = require('mongoose');

const Player = new mongoose.Schema({
  username: String,
  property: {
    fracrion: String,
  },
  resorсes: {
    crystals: Number,
    gold: Number,
  },
  gifts: [
    {
      id: String,
      resource: String,
      amount: Number,
    },
  ],
});

module.exports = mongoose.model('Player', Player);
