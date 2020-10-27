import React from 'react';
import { } from "react-test-renderer";
import { render } from '@testing-library/react';
import { renderHook, act } from "@testing-library/react-hooks";
import Registro from './index';
import useRegistroState from "./state";
import utils from "../../utils/callApi";

describe('Pantalla de Registro', () => {
    test('Debe renderizar correctamente', () => {
        const { getByTestId } = render(
            <Registro />
        );
    })

    test('Test de hook', () => {
        const { result } = renderHook(() => useRegistroState());

        expect(result.current.nombre.value).toBe('');
        expect(result.current.id.value).toBe('');
        expect(result.current.email.value).toBe('');
        expect(result.current.contrasena.value).toBe('');
    })

    test('Cambio de campos en el form de registro', () => {
        const { result } = renderHook(() => useRegistroState());

        const email = 'dalexis.da@gmail.com';

        //@ts-ignore
        act(() => result.current.email.onChange({ target: { value: email } }));
        expect(result.current.email.value).toBe(email);
    })

    test('Debe iniciar sesion', () => {
        const { result, waitFor } = renderHook(() => useRegistroState());

        const email = 'dalexis.da@gmail.com';
        const password = 'password';

        const resolve = {
            ok: true,
            statuscode: 200,
            message: 'Sesion iniciada',
            data: { token: 'Hola' },
        }

        //jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.resolve(resolve));

        //@ts-ignore
        act(() => result.current.email.onChange({ target: { value: email } }));
        //@ts-ignore
        act(() => result.current.contrasena.onChange({ target: { value: password } }));
        //@ts-ignore
        act(() => result.current.registro.onClick({ preventDefault: () => { } }));

        waitFor(() => expect(result.current.contrasena.value).toBe(''));
        waitFor(() => expect(result.current.email.value).toBe(''));
        expect(result.current.error.message).toBe('');
    })
});
