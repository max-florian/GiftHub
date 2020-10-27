import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { } from "react-test-renderer";
import { renderHook, act} from "@testing-library/react-hooks";

import {PagoTarjeta} from './';
import {DropDownCards} from './';
import usePagoTarjeta from './state'
// import { getUserId } from "../../utils/storage";

import api from "../../utils/callApi";

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

});
