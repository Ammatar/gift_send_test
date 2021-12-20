import React from 'react';

const Registration = () => {
  const factionDict = ['Human', 'Elf', 'Orc'];
  const [username, setUsername] = React.useState('');
  const [faction, setFaction] = React.useState(factionDict[0]);
  const registration = async () => {
    if (username !== '') {
      const responce = await fetch('http://localhost:3000/api/createPlayer', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          faction: faction,
        }),
      });
      return responce.json();
    } else {
      alert('empty username');
    }
  };
  return (
    <div className='registration'>
      Character creation
      <div>
        Player name:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Faction:
        <select
          name='faction'
          id='faction'
          value={faction}
          onChange={(e) => setFaction(e.target.value)}
        >
          {factionDict.map((el) => {
            return (
              <option value={el} key={Math.random()}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={() => registration()}>Send data</button>
    </div>
  );
};

export default Registration;
