
import React from 'react';
import { render } from '@testing-library/react';
import CompraGiftCards from './card'

describe('RegistroNegocio Component', () => {
    //renderizar correctamente, la primera prueba siempre retornara algo, por lo que estara correcta
    test('Debe renderizar correctamente', () => {
        const { getByTestId } = render(
            <CompraGiftCards />
        );
    })
});



