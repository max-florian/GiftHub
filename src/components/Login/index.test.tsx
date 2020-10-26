import React from 'react';
import { } from "react-test-renderer";
import { render } from '@testing-library/react';
import { renderHook, act } from "@testing-library/react-hooks";
import Login from '.';
import useLoginState from "./state";
import utils from "../../utils/callApi";

jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn().mockImplementation(() => {
            return {
                replace: jest.fn()
            }
        })
    }
})

describe('Pantalla de Login', () => {
    test('Debe renderizar Correctamente', () => {
        const { getByText } = render(<Login />);
        const buttonElement = getByText(/Entrar/i);
        expect(buttonElement).toBeInTheDocument;
    });

    test('Probando hook', () => {
        const { result } = renderHook(() => useLoginState());

        expect(result.current.emailOrUsername.value).toBe('');
        expect(result.current.password.value).toBe('');
    })

    test('Debe cambiar el email o username', async () => {
        const { result } = renderHook(() => useLoginState());

        const email = 'dalexis.da@gmail.com';

        //@ts-ignore
        await act(async () => result.current.emailOrUsername.onChange({ target: { value: email } }));
        expect(result.current.emailOrUsername.value).toBe(email);
    })

    test('Debe cambiar el password', async () => {
        const { result } = renderHook(() => useLoginState());

        const password = 'password';

        //@ts-ignore
        await act(async () => result.current.password.onChange({ target: { value: password } }));
        expect(result.current.password.value).toBe(password);
    })

    test('Debe iniciar sesion', async () => {
        const { result, waitFor } = renderHook(() => useLoginState());

        const email = 'dalexis.da@gmail.com';
        const password = 'password';

        const resolve = {
            ok: true,
            statuscode: 200,
            message: 'Sesion iniciada',
            data: { token: 'Hola' },
        }

        jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.resolve(resolve));

        //@ts-ignore
        await act(async() => result.current.emailOrUsername.onChange({ target: { value: email } }));
        //@ts-ignore
        await act(async() => result.current.password.onChange({ target: { value: password } }));
        //@ts-ignore
        await act(async() => result.current.login.onClick({ preventDefault: () => { } }));

        waitFor(() => expect(result.current.password.value).toBe(''));
        waitFor(() => expect(result.current.emailOrUsername.value).toBe(''));
        expect(result.current.error.message).toBe('');
    })

    test('Debe mostrar error', async () => {
        const { result, waitFor } = renderHook(() => useLoginState());

        const email = 'dalexis.da@gmail.com';
        const password = 'passwordincorrecta';

        const resolve = {
            ok: false,
            statuscode: 400,
            message: 'No se pudo iniciar sesion',
            data: {},
        }

        jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.resolve(resolve));

        //@ts-ignore
        await act(async() => result.current.emailOrUsername.onChange({ target: { value: email } }));
        //@ts-ignore
        await act(async() => result.current.password.onChange({ target: { value: password } }));
        //@ts-ignore
        await act(async() => result.current.login.onClick({ preventDefault: () => { } }));

        waitFor(() => expect(result.current.password.value).toBe(email));
        waitFor(() => expect(result.current.emailOrUsername.value).toBe(password));
        waitFor(() => expect(result.current.error.message).toBe(resolve.message));
        waitFor(() => expect(resolve.message).toBeInTheDocument());
        
    })
});
