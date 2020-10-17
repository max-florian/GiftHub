import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';

describe('Pantalla de Login', () => {
    test('Debe renderizar Correctamente', () => {
        const { getByText } = render(<Login />);
        const buttonElement = getByText(/Entrar/i);
        expect(buttonElement).toBeInTheDocument;
    });
});
