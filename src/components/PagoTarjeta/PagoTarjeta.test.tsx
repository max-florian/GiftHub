import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { } from "react-test-renderer";
import { renderHook, act} from "@testing-library/react-hooks";

import {PagoTarjeta} from './';
import {DropDownCards} from './';
import usePagoTarjeta from './state'

/*
import api from "../../utils/callApi";*/

describe('<pagotarjeta />', () => {
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
    const tarjeta = 'xxx-xxxx-xxxx-4656'
    render(<DropDownCards tarjetas={[tarjeta]}/>);
    const pagotarjeta = screen.getByText(tarjeta);
    expect(pagotarjeta).toBeInTheDocument();
  });

  test('Probando hook', () => {
    const { result } = renderHook(() => usePagoTarjeta({total,carrito}));
    expect(result.current.objeto.datosFact.total).toBe(0)
    expect(result.current.objeto.errors).toBe("")
  })

  test('Debe dar error si los campos de nueva tarjeta estan vacios, y se intenta pagar', async () => {
    const {result} = renderHook(() => usePagoTarjeta({total,carrito}))
    //@ts-ignore
    await act(async () => result.current.handler.updateAddCart( { target: { checked: true}} ));
    await act(async () => result.current.handler.pagar())
    expect(result.current.objeto.errors).toBe('Los campos del form \"Tarjeta de credito o debito\" no deben estar vacios')
    
  })

});
