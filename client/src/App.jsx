import './App.css';
import store from './Store/store';
import React from 'react';
import { getPlayerlist } from './components/fetch';
import GiftStatus from './components/GiftStatus/GiftStatus';
import PlayerList from './components/PlayerList/PlayerList';
import Registration from './components/Registration/Registration';
import StatusBar from './components/StatusBar/StatusBar';
import Transfer from './components/Transfer/Transfer';

export const mobxStore = store;
function App() {
  const [globalUpdate, setGlobalUpdate] = React.useState(false);
  const [playerId, setPlayerId] = React.useState('61b3721858b892d97e7171be');
  const [playerList, setPlayerList] = React.useState([]);
  const [gifts, setGifts] = React.useState(mobxStore.getGifts());
  React.useEffect(() => {
    mobxStore
      .selectPlayer(playerId)
      .then(() => setGifts([...mobxStore.getGifts()]))
      .then(() => getPlayerlist().then((data) => setPlayerList(data)));
  }, [playerId, globalUpdate]);

  return (
    <div className='main_container'>
      <StatusBar mobxStore={mobxStore} playerId={playerId} />
      <div className='sub_container'>
        <Registration />
        <PlayerList
          mobxStore={mobxStore}
          setGlobalUpdate={setGlobalUpdate}
          globalUpdate={globalUpdate}
          setPlayerId={setPlayerId}
          playerId={playerId}
          playerList={playerList}
        />
        <GiftStatus
          mobxStore={mobxStore}
          setGlobalUpdate={setGlobalUpdate}
          globalUpdate={globalUpdate}
          gifts={gifts}
        />
        <Transfer playerList={playerList} playerId={playerId} />
      </div>
    </div>
  );
}

export default App;
