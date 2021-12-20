import { makeAutoObservable } from 'mobx';
import { host } from '../components/fetch';
class Store {
  id = '';
  username = '';
  property = {};
  resorсes = {};
  gifts = [];

  constructor() {
    makeAutoObservable(this);
    // заглушка - дефолтный логин
    this.selectPlayer('61b3721858b892d97e7171be');
  }
  async selectPlayer(prop_id) {
    const id = prop_id === '' ? '61b3721858b892d97e7171be' : prop_id;
    const responce = await fetch(host + '/api/getPlayerData', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
      }),
    });
    await responce.json().then((el) => {
      this.id = el._id;
      this.username = el.username;
      this.property = el.property;
      this.resorсes = el.resorсes;
      this.gifts = el.gifts;
    });
    return {
      id: this.id,
      username: this.username,
      property: { ...this.property },
      resources: this.resorсes,
      gifts: [...this.gifts],
    };
  }
  getGifts() {
    return this.gifts;
  }
}

const store = new Store();
export default store;
