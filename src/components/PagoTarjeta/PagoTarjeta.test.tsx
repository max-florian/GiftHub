import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PagoTarjeta from './';

describe('<pagotarjeta />', () => {
  const totalfake = 200
  test('it should mount', () => {
    render(<PagoTarjeta total={totalfake}/>);

    const pagotarjeta = screen.getByTestId('pagotarjeta');

    expect(pagotarjeta).toBeInTheDocument();
  });
});
