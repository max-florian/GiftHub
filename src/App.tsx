import React from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1 style={{ fontSize: 40, margin: 20 }}>Gifthub</h1>
        <h4 style={{ margin: 20 }}>Inicia sesión para continuar</h4>
        <Login></Login>
      </div>
    </div>
  );
}

export default App;
