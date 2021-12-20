import React from 'react';
import { mobxStore } from '../../App';

const Transfer = ({ playerId, playerList }) => {
  const resDict = ['gold', 'crystals'];
  const factionDict = ['human', 'elf', 'orc'];
  const [res, setRes] = React.useState(resDict[0]);
  const [target_id, setTarget_id] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [amountGroup, setAmountGroup] = React.useState(0);
  const [resGroup, setResGroup] = React.useState(resDict[0]);
  const [factionGroup, setFactionGroup] = React.useState(factionDict[0]);

  return (
    <div>
      Transfer
      <br />
      <div>
        Send
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          name='res'
          id='res'
          value={res}
          onChange={(e) => setRes(e.target.value)}
        >
          {resDict.map((el) => {
            return (
              <option value={el} key={Math.random()}>
                {el}
              </option>
            );
          })}
        </select>
        to
        <select
          name='faction'
          id='faction'
          value={target_id}
          onChange={(e) => setTarget_id(e.target.value)}
        >
          <option>---</option>
          {playerList.map((el) => {
            if (el._id != playerId) {
              return (
                <option value={el._id} key={Math.random()}>
                  {el.username}
                </option>
              );
            }
          })}
        </select>
        <button
          onClick={() => {
            if (target_id && amount < mobxStore.resorсes[res] && amount > 0) {
              console.log(playerId, target_id, res, amount);
            }
          }}
        >
          Send resource
        </button>
      </div>
      <br />
      <div>
        transfer to group:
        <br />
        Send:{' '}
        <input
          type='number'
          value={amountGroup}
          onChange={(e) => setAmountGroup(e.target.value)}
        />
        <select
          name='res'
          id='res'
          value={resGroup}
          onChange={(e) => setResGroup(e.target.value)}
        >
          {resDict.map((el) => {
            return (
              <option value={el} key={Math.random()}>
                {el}
              </option>
            );
          })}
        </select>
        to
        <select
          name='res'
          id='res'
          value={factionGroup}
          onChange={(e) => setFactionGroup(e.target.value)}
        >
          {factionDict.map((el) => {
            return (
              <option value={el} key={Math.random()}>
                {el}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            if (amountGroup < mobxStore.resorсes[res] && amountGroup > 0) {
              console.log(playerId, resGroup, factionGroup, amountGroup);
            }
          }}
        >
          Send resource
        </button>
      </div>
    </div>
  );
};

export default Transfer;
