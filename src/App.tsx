import React from 'react';
import './App.css';
import Registro from './components/Registro';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1 style={{ fontSize: 40, margin: 20 }}>Gifthub</h1>
        <h4 style={{ margin: 20 }}>¡Registrate!</h4>
        <Registro></Registro>
      </div>
    </div>
  );
}

export default App;
