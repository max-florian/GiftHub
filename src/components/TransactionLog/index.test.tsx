import React from 'react'
import { act as act_render, render } from '@testing-library/react';
import TransactionLog, { TransactionDetail } from '.';

var transaction = {"_id":"5f99ff9c782c895678e5d3a2","fecha":"2020-10-28 17:32:44","tipo":"Compra","origen":"Tienda","origenname":"Tienda","destino":"5f99fdba946d8a0683db100e","destinoname":"alexizzarevalo","total":433.72,"tarjeta":"xxxx-xxxx-xxxx-1457","detalle":[{"card_id":"3","card_name":"Steam","card_value":"25","card_price":27.5,"_id":"5f99ff9c782c895678e5d3a0"},{"card_id":"3","card_name":"Steam","card_value":"25","card_price":27.5,"_id":"5f99ff9c782c895678e5d3a1"}]}

describe("Log de Transacciones", () => {

    describe("Vista de Componentes", () => {
    
        test("TransactionDetail renderiza correctamente", () => {
            render(<TransactionDetail transaction={transaction}/>)
        })
    })
});