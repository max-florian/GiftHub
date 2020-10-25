import React from 'react';
import usePagoTarjeta from './state'

const PagoTarjeta: React.FC = () => {

  return(<div className="container" data-testid="pagotarjeta" >{//style={{background: 'blue'}}>
  }
  <div style={{ }}>
      <h3>Resumen de compra</h3>
      <hr/>
      <p>Total a cancelar: <strong>Q45.5</strong></p>
    </div>
    <div>
      <h3>Continuar con el pago</h3>
      <hr/>
      <div className="card">
        <div className="card-header">
          Tarjeta de credito o debito
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label >Numero de tarjeta</label>
                <input type="text" className="form-control" id="notarjeta" placeholder="xxxx-xxxx-xxxx-xxxx" />
              </div>
              <div className="form-group col-md-3">
                <div className="row">
                  <div className="col-sm-12">
                    <label>Fecha de vencimiento</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <input type="text" className="form-control" id="mesvenc" placeholder="Mes" list="monthList"/>
                      <datalist id="monthList">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </datalist>
                    </div>
                  </div>
                  <div className="col-sm-1">
                    <h2>/</h2>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <input type="text" className="form-control" id="anovenc" placeholder="Año" list="anioList"/>
                      <datalist id="anioList">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </datalist>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-2">
                <label >CVV</label>
                <input type="text" className="form-control" id="cvv" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div style={{marginTop: "30px"}}>
        <h3>Datos de facturación</h3>
        <hr/>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder=""/>
                </div>
                <div className="form-group col-md-6">
                  <label>Apellido</label>
                  <input type="text" className="form-control" id="apellido" placeholder=""/>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style={{textAlign:"center", marginTop: "30px"}}>
          <button type="button" className="btn btn-primary">Pagar</button>
        </div>
      </div>
    </div>
  </div>);
}

export default PagoTarjeta;
