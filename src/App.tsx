import React from 'react';
import './App.css';
import PagoTarjeta from "./components/PagoTarjeta";

function App() {
  const total = 200.99;
  return (
    <div>
      <PagoTarjeta total={total}/>
    </div>
  );
}

export default App;
