import React from 'react';
import usePagoTarjeta from './state'

const PagoTarjeta: React.FC = () => (
  <div className="container" data-testid="pagotarjeta" style={{background:'green'}}>
    <div className="row">
      Pago con tarjeta Component
    </div>
  </div>
);

export default PagoTarjeta;
