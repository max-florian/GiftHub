import React from 'react';
import usePagoTarjeta from './state'

interface init{
  total: number
  carrito: card[]
}

interface card {
  card_id: any,
  card_name: any,
  card_image: any,
  card_value: any,
  card_price: number
}
const PagoTarjeta = () => {
  var total = Number(localStorage.getItem('total'));
  var carrito = JSON.parse(localStorage.getItem('carrito') || "{}");
  const { objeto,  handler} = usePagoTarjeta({total, carrito})

  const meses = ["Mes","01","02","03","04","05","06","07","08","09","10","11","12"]
  const anios = ["Año","20","21","22","23","24","25","26","27","28","29"]

  return(<div className="container" data-testid="pagotarjeta" >
  <div style={{ }}>
      <h3>Resumen de compra</h3>
      <hr/>
      <p>Total a cancelar: <strong>${objeto.datosFact.total}</strong></p>
      <p>Total a en moneda local: <strong>Q{objeto.totalEnQ}</strong></p>
    </div>
    <div>
      <h3>Continuar con el pago</h3>
      <hr/>
      { objeto.errors !== "" &&
        <div className="alert alert-danger" role="alert">
          {objeto.errors}
        </div>
      }
      {objeto.tarjetasRegis.length > 1 &&
        <div className="col-sm-12">
          <div className="form-group">
            <label>Select a card:</label>
            <select className="form-control" id="tarjetasRegis"
                    value={objeto.tarjetaReg}
                    onChange={handler.updateTarjetaReg}>
              <DropDownCards tarjetas={objeto.tarjetasRegis} />
            </select>
          </div>
        </div>
      }
      <div className="card">
        <div className="card-header">
          <input
            name="isGoing"
            type="checkbox"
            checked={handler.addCard}
            onChange={handler.updateAddCart}/>
          &nbsp; Tarjeta de credito o debito
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label >Numero de tarjeta</label>
                <input type="text" className="form-control" id="notarjeta"
                       placeholder="xxxx-xxxx-xxxx-xxxx" value={objeto.tarjeta.notarjeta}
                       onChange={handler.updateNoTarjeta}/>
              </div>
              <div className="form-group col-md-3">
                <div className="row">
                  <div className="col-sm-12">
                    <label>Fecha de vencimiento</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <select className="form-control" id="mesvenc"
                              value={objeto.tarjeta.mesvenc}
                              onChange={handler.updateMes}>
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
                              value={objeto.tarjeta.aniovenc}
                              onChange={handler.updateAnio}>
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
                       value={objeto.tarjeta.cvv}
                       onChange={handler.updateCVV}/>
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
                     value={objeto.datosFact.nombre}
                     readOnly={true}/>
            </div>
            <div className="form-group col-md-6">
              <label>Apellido</label>
              <input type="text" className="form-control" id="apellido" placeholder=""
                     value={objeto.datosFact.apellido}
                     readOnly={true}/>
            </div>
          </div>
        </form>
      </div>
      <div style={{textAlign:"center", marginTop: "30px"}}>
        <button type="button" className="btn btn-primary" onClick={handler.pagar}>Pagar</button>
      </div>
    </div>
  </div>);
}

const DropDownCards = ({tarjetas}:any) => {
  return ( tarjetas.map((card:any)=> <option value={card} key={card}>{card}</option>) )
}

export {
  PagoTarjeta,
  DropDownCards
};
