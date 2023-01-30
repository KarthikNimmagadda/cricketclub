import React, { useState } from "react";
import './App.css';
import './normalize.css';
import PlayerForm from './Player/PlayerForm';
import Header from './Player/Header';
import PlayersList from './Player/PlayersList';
import Summary from "./Player/Summary";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<PlayerForm />);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSelection = (component) => {
    setSelectedComponent(component);
    setShowSidebar(false);
  };

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
        <div className="content">
          <div className="main-content">
            {showSidebar && (
              <div className="sidebar">
                <ul>
                  <li onClick={() => handleSelection(<PlayersList setComponent={handleSelection}/>)}>Players List</li>
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
