import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { } from "react-test-renderer";
import { renderHook, act} from "@testing-library/react-hooks";

import {PagoTarjeta} from './';
import {DropDownCards} from './';
import usePagoTarjeta from './state'

import api from "../../utils/callApi";

describe('<pagotarjeta />', () => {
  const tarjeta = 'xxx-xxxx-xxxx-4656'
  const newTarjeta = '1234132412341234'
  const total = 27.5
  const carrito = [
    {
      "card_id":"3",
      "card_name":"Steam",
      "card_image":"https://mojolika.com/wp-content/uploads/2019/04/196.png",
      "card_value":"25",
      "card_price":27.5
    }]

  test('Pantalla pago con tarjeta', () => {
    render(<PagoTarjeta total={total} carrito={carrito}/>);
    const pagotarjeta = screen.getByTestId('pagotarjeta');
    expect(pagotarjeta).toBeInTheDocument();
  });

  test('Dropdown list de tarjetas', () => {
    render(<DropDownCards tarjetas={[tarjeta]}/>);
    const pagotarjeta = screen.getByText(tarjeta);
    expect(pagotarjeta).toBeInTheDocument();
  });

  test('Probando hook', () => {
    const { result } = renderHook(() => usePagoTarjeta({total,carrito}));

    const resolve = {
      ok: true,
      statuscode: 200,
      message: 'Sesion iniciada',
      data: { token: 'Hola' },
    }
    jest.spyOn(api, 'callApi').mockImplementation(() => Promise.resolve(resolve));

    expect(result.current.objeto.datosFact.total).toBe(0)
    expect(result.current.objeto.errors).toBe("")
  })

  /*test('Debe dar error si los campos de nueva tarjeta estan vacios, y se intenta pagar', async () => {
    const {result} = renderHook(() => usePagoTarjeta({total,carrito}))
    //@ts-ignore
    await act(async () => result.current.handler.updateAddCart( { target: { checked: true}} ));
    await act(async () => result.current.handler.pagar())
    expect(result.current.objeto.errors).toBe('Los campos del form \"Tarjeta de credito o debito\" no deben estar vacios')
  })*/

  /*test('Debe dar error si la tarjeta o cvv no tienen el tamano adecuado', async () => {
    const {result} = renderHook(() => usePagoTarjeta({total,carrito}))
    //@ts-ignore
    await act(async () => result.current.handler.updateAddCart( { target: { checked: true}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateNoTarjeta( { target: { value: newTarjeta + 1 }} )); // Un caracter mas para que falle
    //@ts-ignore
    await act(async () => result.current.handler.updateMes( { target: { value: '01'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateCVV( { target: { value: '242'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.pagar())
    expect(result.current.objeto.errors).toBe('El tamano de la tarjeta(16) o de cvv(3) no es correcto')
  })*/

  /*test('Debe se debe llamar al metodo send_payment si los datos de la nueva tarjeta son correctos', async () => {
    const {result} = renderHook(() => usePagoTarjeta({total,carrito}))
    //@ts-ignore
    await act(async () => result.current.handler.updateAddCart( { target: { checked: true}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateNoTarjeta( { target: { value: newTarjeta }} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateMes( { target: { value: '01'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.updateCVV( { target: { value: '242'}} ));
    //@ts-ignore
    await act(async () => result.current.handler.pagar())

    const resolve = {
      ok: true,
      statuscode: 200,
      message: 'Sesion iniciada',
      data: { token: 'Hola' },
    }

    jest.spyOn(api, 'callApi').mockImplementation(() => Promise.resolve(resolve));

    // expect here, it expect it just a test example
    expect(result.current.objeto.errors).toBe("")
  })*/

});
