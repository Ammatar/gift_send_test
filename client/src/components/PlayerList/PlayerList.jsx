import React from 'react';
import { sendGift } from '../fetch';

const PlayerList = ({
  mobxStore,
  setGlobalUpdate,
  globalUpdate,
  setPlayerId,
  playerList,
}) => {
  return (
    <div className='playerList_container'>
      playerlist
      {playerList
        ? playerList.map((el) => {
            if (mobxStore.id !== el._id) {
              return (
                <div key={Math.random()}>
                  {el.username}
                  <button
                    onClick={() => {
                      setPlayerId(el._id);
                      setGlobalUpdate(!globalUpdate);
                    }}
                  >
                    select
                  </button>
                  <button
                    onClick={() => {
                      sendGift(mobxStore.id, el._id, 'gold', 100);
                      setGlobalUpdate(!globalUpdate);
                    }}
                  >
                    send gift
                  </button>
                </div>
              );
            }
          })
        : null}
    </div>
  );
};

export default PlayerList;
