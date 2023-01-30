import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './normalize.css';
import PlayerForm from './Player/PlayerForm';
import Header from './Player/Header';
import PlayersList from './Player/PlayersList';
import Summary from "./Player/Summary";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<PlayerForm />);
  const [players, setPlayers] = useState([]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSelection = (component) => {
    setSelectedComponent(component);
    setShowSidebar(false);
  };

  useEffect(() => {
    axios.get(
        'https://cricketapp-e4008-default-rtdb.firebaseio.com/players.json'
    ).then(res => {
      const data = res.data;
      const retrievedPlayers = [];
    
      for(const key in data) {
        retrievedPlayers.push({
            id: key,
            name: data[key].name,
            dates: data[key].dates,
            playerType: data[key].playerType
        })
    }
      setPlayers(retrievedPlayers);
  })
  .catch(err => {
      console.log(err);
  });

}, [players]); 

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
        <div className="content">
          <div className="main-content">
            {showSidebar && (
              <div className="sidebar">
                <ul>
                  <li onClick={() => handleSelection(<PlayersList setComponent={handleSelection} players={players}/>)}>Players List</li>
                  <li onClick={() => handleSelection(<PlayerForm />)}>Player Form</li>
                  <li onClick={() => handleSelection(<Summary setComponent={handleSelection}/>)}>Summary</li>
                </ul>
              </div>
            )}
          {selectedComponent}
        </div>
      </div>
    </div>
  );
}

export default App;
