import React from 'react';
import usePagoTarjeta from './state'

interface init{
  total: number
}

const PagoTarjeta = ({total}:init) => {
  const { tarjeta, setTarjeta, tarjetaReg, updateTarjetaReg,
    tarjetasRegis, updateNoTarjeta, updateMes,
    updateAnio, updateCVV, pagar, addCard,updateAddCart,
    errors,
    datosFact, setDatosFact} = usePagoTarjeta({total})

  const meses = ["Mes","01","02","03","04","05","06","07","08","09","10","11","12"]
  const anios = ["Año","20","21","22","23","24","25","26","27","28","29"]

  return(<div className="container" data-testid="pagotarjeta" >
  <div style={{ }}>
      <h3>Resumen de compra</h3>
      <hr/>
      <p>Total a cancelar: <strong>Q{datosFact.total}</strong></p>
    </div>
    <div>
      <h3>Continuar con el pago</h3>
      <hr/>
      { errors !== "" &&
        <div className="alert alert-danger" role="alert">
          {errors}
        </div>
      }
      {tarjetasRegis.length > 1 &&
        <div className="col-sm-12">
          <div className="form-group">
            <label>Select a card:</label>
            <select className="form-control" id="tarjetasRegis"
                    value={tarjetaReg}
                    onChange={(e) => updateTarjetaReg(e.target.value)}>
              {tarjetasRegis.map((card)=>{
                return <option value={card} key={card}>{card}</option>
              })}
            </select>
          </div>
        </div>
      }
      <div className="card">
        <div className="card-header">
          <input
            name="isGoing"
            type="checkbox"
            checked={addCard}
            onChange={(e) => updateAddCart(e.target.checked)}/>
          &nbsp; Tarjeta de credito o debito
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label >Numero de tarjeta</label>
                <input type="text" className="form-control" id="notarjeta"
                       placeholder="xxxx-xxxx-xxxx-xxxx" value={tarjeta.notarjeta}
                       onChange={(e) => updateNoTarjeta(e.target.value)}/>
              </div>
              <div className="form-group col-md-3">
                <div className="row">
                  <div className="col-sm-12">
                    <label>Fecha de vencimiento</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <select className="form-control" id="mesvenc"
                              value={tarjeta.mesvenc}
                              onChange={(e) => updateMes(e.target.value)}>
                        {meses.map((month)=>{
                          return <option value={month} key={month}>{month}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-1">
                    <h2>/</h2>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <select className="form-control" id="aniovenc"
                              value={tarjeta.aniovenc}
                              onChange={(e) => updateAnio(e.target.value)}>
                        {anios.map((year)=>{
                          return <option value={year} key={year}>{year}</option>
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-2">
                <label >CVV</label>
                <input type="text" className="form-control" id="cvv"
                       value={tarjeta.cvv}
                       onChange={(e)=> updateCVV(e.target.value)}/>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div style={{marginTop: "30px"}}>
        <h3>Datos de facturación</h3>
        <hr/>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder=""
                     value={datosFact.nombre}
                     readOnly={true}/>
            </div>
            <div className="form-group col-md-6">
              <label>Apellido</label>
              <input type="text" className="form-control" id="apellido" placeholder=""
                     value={datosFact.apellido}
                     readOnly={true}/>
            </div>
          </div>
        </form>
      </div>
      <div style={{textAlign:"center", marginTop: "30px"}}>
        <button type="button" className="btn btn-primary" onClick={pagar}>Pagar</button>
      </div>
    </div>
  </div>);
}

export default PagoTarjeta;
