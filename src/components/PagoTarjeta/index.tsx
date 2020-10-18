import React from 'react';
import usePagoTarjeta from './state'

const PagoTarjeta: React.FC = () => {

  return(<div className="container" data-testid="pagotarjeta" style={{background: 'green'}}>
    <div className="row">
      <div className="col">
        Número de tarjeta
        Fecha de vencimiento
        Mes --- Año
        CVV ¿Qué es esto?
        Datos de facturacion
        Nombre en la tarjeta
      </div>
    </div>
  </div>);
}

export default PagoTarjeta;
