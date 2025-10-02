<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======

import React, { useState } from 'react';

// coin_count is the main thing here





const App = () => {

  const [coin_count, setCoinCount] = useState(0);

  // backup: let coinz = 0; // keeping for vibes
  //  coin handler
  const handleCollectCoin = () => {
    setCoinCount(coin_count + 1);


    console.log('Caught ya lackin', coin_count + 1);
  };

  // render
  return (
    <div style={{ padding: '40px' }}>
      <h1>BestBit Coin Quest</h1>


      <div>

        <span style={{ fontSize: '2em' }}>🪙</span>
        
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{coin_count}</span>
        
        <span style={{ marginLeft: '5px' }}>coins</span>
      </div>
      <button onClick={handleCollectCoin} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Collect Coin all of em
      </button>
      
      <div style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
        Debug: coin_count = {coin_count}
      </div>
      


    </div>
  );
};

export default App;

// ---
// Commit message: "feat: basic coin counter + collect button + debug logs"
// README: Added first feature — coin counter and collect button. Click to collect coins. Debug logs print to console.
// ---
>>>>>>> main
