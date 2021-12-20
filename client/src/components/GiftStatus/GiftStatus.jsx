import React from 'react';
import { observer } from 'mobx-react-lite';
import { clearGifts } from '../fetch';

const GiftStatus = observer(({ gifts, setGlobalUpdate, globalUpdate }) => {
  return (
    <div className='giftStatus_container'>
      Gift Status
      <button
        onClick={() => {
          clearGifts();
          setGlobalUpdate(!globalUpdate);
        }}
      >
        reset Gifts
      </button>
      {gifts
        ? gifts.map((el) => {
            return (
              <div key={Math.random()}>
                {el.id} - {el.resource} - {el.amount}
              </div>
            );
          })
        : null}
    </div>
  );
});

export default GiftStatus;
