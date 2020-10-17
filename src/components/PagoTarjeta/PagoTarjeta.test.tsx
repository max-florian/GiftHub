import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PagoTarjeta from './';

describe('<pagotarjeta />', () => {
  test('it should mount', () => {
    render(<PagoTarjeta />);

    const pagotarjeta = screen.getByTestId('pagotarjeta');

    expect(pagotarjeta).toBeInTheDocument();
  });
});
