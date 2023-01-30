import React from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header__icon" onClick={toggleSidebar}>
        &#9776;
      </div>
      <h1 className="header__title">Fremont Cricket Club</h1>
      <p className="header__availability"></p>
    </header>
  );
};

export default Header;
