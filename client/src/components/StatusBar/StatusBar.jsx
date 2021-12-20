import React from 'react';
import { observer } from 'mobx-react-lite';

const StatusBar = observer(({ mobxStore, playerId }) => {
  const [data, setData] = React.useState({});
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      setData(await mobxStore.selectPlayer(playerId));
    }
    getData();
  }, []);
  React.useEffect(() => {
    async function getData() {
      setData(await mobxStore.selectPlayer(playerId));
    }
    getData();
  }, [playerId]);
  return (
    <div className='statusBar_container'>
      status bar <button onClick={() => setUpdate(!update)}>Refresh</button>
      {data.username ? (
        <div>
          {data.username} - Resources:
          {Object.keys(data.resources).map((el) => {
            return (
              <span key={Math.random()}>
                {el} - {data.resources[el]}
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
});

export default StatusBar;
