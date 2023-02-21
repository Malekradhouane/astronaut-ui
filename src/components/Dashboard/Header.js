import React from 'react';

const Header = ({ setIsAdding }) => {
  return (
    <header>
      <h1>Liste des Astronaute</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Nouveau Astronaute</button>
      </div>
    </header>
  );
};

export default Header;
