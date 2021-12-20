// хост для разработки
const host = 'http://localhost:3000';

const getPlayerlist = async () => {
  const responce = await fetch(host + '/api/getPlayerList', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  return await responce.json();
};

const transferResources = async (source_id, target_id, type, amount) => {
  const responce = await fetch(host + '/api/transferResources', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source_id: source_id,
      target_id: target_id,
      type: type,
      amount: amount,
    }),
  });
  return await responce.json();
};
const sendGift = async (source_id, target_id, type, amount) => {
  // внедрить расчет размера подарка в зависимоти от ...
  const responce = await fetch(host + '/api/giftToOne', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source_id,
      target_id,
      type,
      amount,
    }),
  });
  return await responce.json();
};

// ресет подарков
const clearGifts = async () => {
  const responce = await fetch(host + '/api/clearGiftsAt24', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
};

module.exports = {
  host,
  getPlayerlist,
  transferResources,
  sendGift,
  clearGifts,
};
