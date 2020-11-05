import api from "../../utils/callApi";
jest.mock('../../utils/callApi',()=>{
  return { callApi: ({uri, method = 'GET', body = {}, sendToken = true }:any) => {
      return Promise.resolve({
        ok: true,
        message: 'ok',
        statuscode: 200,
        data: { }
      })
    }}
})

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { } from "react-test-renderer";
import { renderHook, act} from "@testing-library/react-hooks";
import {PagoTarjeta} from './';
import {DropDownCards} from './';
import usePagoTarjeta from './state'

describe('<pagotarjeta />', () => {
  const encryptedCard = 'xxx-xxxx-xxxx-4656'
  const newCard = '1234132412341234'
  const total = 27.5

  const carrito = [{
    "card_id":"3",
    "card_name":"Steam",
    "card_image":"https://mojolika.com/wp-content/uploads/2019/04/196.png",
    "card_value":"25",
    "card_price":27.5
  }]

  //@ts-ignore
  jest.spyOn(window,'fetch').mockImplementation(() => {
    return Promise.resolve({
      json: () => [{total: 7.7}]
    })
  })

  /*test('Pantalla pago con tarjeta', () => {
    const { getByTestId } = render(<PagoTarjeta total={total} carrito={carrito} />);
    const buttonElement = getByTestId('pagotarjeta')
    expect(buttonElement).toBeInTheDocument
  });*/

  test('Dropdown list de tarjetas', () => {
    render(<DropDownCards tarjetas={[encryptedCard]}/>);
    const pagotarjeta = screen.getByText(encryptedCard);
    expect(pagotarjeta).toBeInTheDocument();
  });

  /*test('Probando hook', () => {
    jest.spyOn(api,'callApi').mockImplementation(() => Promise.resolve({
        ok: true,
        message: 'ok',
        statuscode: 200,
        data: {
          hola: 'mundo'
        }
      })
    )
    const { result } = renderHook(() => usePagoTarjeta({total,carrito}));
    expect(result.current.objeto.datosFact.total).toBe(0)
    expect(result.current.objeto.errors).toBe("")
  })*/

  test('Debe dar error si los campos de nueva tarjeta estan vacios, y se intenta pagar', async () => {
    const {result} = renderHook(() => usePagoTarjeta({total,carrito}))
    //@ts-ignore
    await act(async () => result.current.handler.updateAddCart( { target: { checked: true}} ));
    await act(async () => result.current.handler.pagar())
    expect(result.current.objeto.errors).toBe('Los campos del form \"Tarjeta de credito o debito\" no deben estar vacios')
  })

  test('Debe dar error si la tarjeta o cvv no tienen el tamano adecuado', async () => {
    const {result} = renderHook(() => usePagoTarjeta({total,carrito}))
    //@ts-ignore
    await act(async () => result.current.handler.updateAddCart( { target: { checked: true}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateNoTarjeta( { target: { value: newCard + 1 }} )); // Un caracter mas para que falle
    //@ts-ignore
    await act(async () => result.current.handler.updateMes( { target: { value: '01'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateCVV( { target: { value: '242'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.pagar())
    expect(result.current.objeto.errors).toBe('El tamano de la tarjeta(16) o de cvv(3) no es correcto')
  })

  test('Debe se debe llamar al metodo send_payment si los datos de la nueva tarjeta son correctos', async () => {
    const {result} = renderHook(() => usePagoTarjeta({total,carrito}))
    //@ts-ignore
    await act(async () => result.current.handler.updateAddCart( { target: { checked: true}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateNoTarjeta( { target: { value: newCard }} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateMes( { target: { value: '01'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateCVV( { target: { value: '242'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.pagar())
    // expect here, it expect it just a test example
    expect(result.current.objeto.errors).toBe("")
  })

});
