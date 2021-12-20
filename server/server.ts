import express = require('express');
import cors = require('cors');
const PORT = 3000;
const { dbConnect } = require('./db/db');
import User = require('./db/models/PlayerModel');

const app = express();
dbConnect();

app.use(express.json());
app.use(cors());
app.get('/', async (req, res) => {
  res.redirect('http://localhost:3001');
});

// создание игрока с дефолтными параметрами
app.post('/api/createPlayer', async (req, res) => {
  const { username, faction } = req.body;
  const user = await User.create({
    username: username,
    property: {
      fracrion: faction,
    },
    resorсes: {
      crystals: 0,
      gold: 0,
    },
    gifts: [],
  });
  console.log(`username: ${username}, faction: ${faction}`);
});

// получить массив игроков
app.post('/api/getPlayerList', async (req, res) => {
  const playerList = await User.find();
  res.json(playerList);
});
// получить данные игрока
app.post('/api/getPlayerData', async (req, res) => {
  const { id } = req.body;

  const data = await User.findOne({ _id: id });

  res.send(data);
});
// передача ресурсов от игрока к игроку
app.post('/api/transferResources', async (req, res) => {
  const { source_id, target_id, type, amount } = req.body;
  console.log(req.body);
  const sourceUser = await User.findOne({ _id: source_id });
  const targetUser = await User.findOne({ _id: target_id });
  sourceUser['resorсes'][type] -= amount;
  targetUser['resorсes'][type] -= amount;
  sourceUser.save();
  targetUser.save();
  res.send({ status: 'ok' });
  // по id передать? ресурс игроку
});
//  вычесть ресурс в "никуда"
app.post('/api/subtractResource', async (req, res) => {
  const { _id, type, amount } = req.body;
  const targetUser = await User.findOne({ _id: _id });
  targetUser['resorсes'][type] -= amount;
  targetUser.save();
  res.send({ status: 'ok' });
  // по id вычесть ресурс,
});
// добавить ресурс группе игроков
app.post('/api/addResourceToGroup', async (req, res) => {
  const { type, amount } = req.body;
  if (req.body.idsArray) {
    const { idsArray } = req.body;
    idsArray.map(async (el) => {
      const data = await User.findOne({ _id: el });
      data['resorсes'][type] += amount;
      data.save();
    });
  } else if (req.body.propType && req.body.propValue) {
    const { propType, propValue } = req.body;
    const playersArray = await User.find({ property: { propType: propValue } });
    await console.log(playersArray);
  }
  res.send({ status: 'ok' });
});
// по свойству вычесть ресурс у группы
app.post('/api/subtractResourceFromGroup', (req, res) => {
  res.send({ status: 'ok' });
});

//подарок одному игроку по id
app.post('/api/giftToOne', async (req, res) => {
  const { source_id, target_id, type, amount } = req.body;

  const data = await User.findOne({ _id: source_id });
  if (data.gifts.length < 10) {
    data.gifts.push({
      id: target_id,
      resource: type,
      amount: amount,
    });
    data.save();

    const resource = await User.findOne({ _id: target_id });
    resource['resorсes'][type] += amount;
    resource.save();
    res.send({ status: 'ok' });
  } else {
    res.send({ status: 'failed' });
  }
});
//подарок группе (лимит 10 подарков - уже отправленные)
app.post('/api/giftToGroup', (req, res) => {});

// ресетим подарки (выполнять раз в сутки)
app.post('/api/clearGiftsAt24', async (req, res) => {
  let data = await User.find();

  data = data.map((el) => {
    el.gifts = [];
    el.save();
    return el;
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
