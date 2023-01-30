import React, { useState } from 'react';
import axios from 'axios';
import './PlayerForm.css';

const PlayerForm = () => {
  const [name, setName] = useState('');
  const [playerType, setPlayerType] = useState('Batsman');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
        setError('Name is required');
        return;
    }
    setError('');

    try {
      const response = await axios.post(
        'https://cricketapp-e4008-default-rtdb.firebaseio.com/players.json',
        { name, playerType, availableDates: [] }
      );

      console.log(response.data);
      setName('');
      setPlayerType('Batsman');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="player-form">
        <form onSubmit={handleSubmit}>
            <label>Enter Player details</label>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && <div className="error">{error}</div>}
            <select value={playerType} onChange={(e) => setPlayerType(e.target.value)}>
                <option value="">Select Player Type</option>
                <option value="Allrounder">Allrounder</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="Keeper Allrounder">Keeper Allrounder</option>
                <option value="Keeper Batsman">Keeper Batsman</option>
                <option value="Keeper Bowler">Keeper Bowler</option>
            </select>
            <button type="submit">Add Player</button>
        </form>
    </div>
  );
};

export default PlayerForm;
