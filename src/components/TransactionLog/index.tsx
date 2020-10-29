import React, { useState, useEffect } from 'react'

const $ = require("jquery");
$.DataTable = require("datatables.net-bs4");
require( 'datatables.net-select-bs4' )

export function TransactionDetail({transaction}:{transaction:any}){
    if(transaction == null){
        return <></>
    }

    return (
        <>
        <dl className="row">
            <dt className="col-sm-3">Fecha</dt>
            <dd className="col-sm-9">{transaction.fecha}</dd>

            <dt className="col-sm-3">Origen</dt>
            <dd className="col-sm-9">{transaction.origenname}</dd>

            <dt className="col-sm-3">Destino</dt>
            <dd className="col-sm-9">{transaction.destinoname}</dd>

            <dt className="col-sm-3">Total</dt>
            <dd className="col-sm-9">{transaction.total}</dd>
        </dl>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Item #</th>
                    <th>Card ID</th>
                    <th>Card Name</th>
                    <th>Card Value</th>
                    <th>Card Price</th>
                </tr>
            </thead>
            <tbody>
                {transaction.detalle.map((item:any, index:any) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.card_id}</td>
                        <td>{item.card_name}</td>
                        <td>{item.card_value}</td>
                        <td>{item.card_price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default function TransactionLog({dataSet}:{dataSet:any}){
    var $el:any = undefined
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        if($el === undefined)
            return;

        var dt = $el.DataTable({
            data: dataSet,
            select: {
                style: 'single',
                className: 'selected'
            },
            columns: [
                { title: "Fecha", data:'fecha' },
                { title: "Tipo Transac.", data:'tipo' },
                { title: "Origen", data: 'origenname' },
                { title: "Destino", data:"destinoname" },
                { title: "Total", data: 'total' },    
                { title: "Tarjeta", data: 'tarjeta' },               
            ]
        })

        dt.on('select', function(e:any, dt:any, type:any, indexes:any){
            setSelectedTransaction(dt.row(indexes).data());
            $("#hackButton").click();
        })

        return function cleanup(){
            dt.destroy();
        }
    })

    return(
        <>
        <div className="mx-4" style={{padding: 20}}>
            <h1>Log de Transacciones</h1>
            <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.22/sl-1.3.1/datatables.min.css"/>
            <table
                className="table table-striped table-bordered"
                id="dataTable"
                ref={(el) => {$el = $(el)}}
            />
        </div>
        
        <div className="modal fade" id="detailModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Detalle Transaccion</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <TransactionDetail transaction={selectedTransaction}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <button id="hackButton" type="button" data-toggle="modal" data-target="#detailModal" hidden={true}>
            Hack
        </button>
        </>
    )
}