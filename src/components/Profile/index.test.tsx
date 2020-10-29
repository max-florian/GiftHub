import React from 'react';
import { } from "react-test-renderer";
import { render } from '@testing-library/react';
import { renderHook, act } from "@testing-library/react-hooks";
import Profile from '.';
import useProfileState from "./state";
import utils from "../../utils/callApi";
import * as storage from "../../utils/storage";

const mockReplace = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn().mockImplementation(() => {
            return {
                replace: mockReplace
            }
        })
    }
})

describe('Pantalla de Perfil', () => {

    test('Debe renderizar Correctamente', () => {
        const { getByText } = render(<Profile />);
        const buttonElement = getByText(/Perfil/i);
        expect(buttonElement).toBeInTheDocument;
    });

    test('Debe cambiar el nombre de usuario', async () => {
        const { result } = renderHook(() => useProfileState());

        //@ts-ignore
        await act(async () => result.current.handles.setUsername({ target: { value: 'alexizzarevalo' } }));

        expect(result.current.user.username).toBe('alexizzarevalo');
    })

    test('Debe cambiar el correo del usuario', async () => {
        const { result } = renderHook(() => useProfileState());

        //@ts-ignore
        await act(async () => result.current.handles.setUsername({ target: { value: 'alexizzarevalo' } }));
        expect(result.current.user.username).toBe('alexizzarevalo');
        //@ts-ignore
        await act(async () => result.current.handles.setEmail({ target: { value: 'dalexis.da@gmail.com' } }));
        expect(result.current.user.email).toBe('dalexis.da@gmail.com');
        //@ts-ignore
        await act(async () => result.current.handles.setAge({ target: { value: '23' } }));
        expect(result.current.user.age).toBe(23);
        //@ts-ignore
        await act(async () => result.current.handles.setDpi({ target: { value: '3244843821703' } }));
        expect(result.current.user.dpi).toBe(3244843821703);
        //@ts-ignore
        await act(async () => result.current.handles.setName({ target: { value: 'Darwin' } }));
        expect(result.current.user.name).toBe('Darwin');
        //@ts-ignore
        await act(async () => result.current.handles.setLastname({ target: { value: 'Arevalo' } }));
        expect(result.current.user.lastname).toBe('Arevalo');
        //@ts-ignore
        await act(async () => result.current.handles.setPassword({ target: { value: 'password' } }));
        expect(result.current.user.password).toBe('password');

    })

    test('Debe actualizar el perfil del usuario', async () => {
        const resolve = {
            ok: true,
            statuscode: 200,
            message: 'Sesion iniciada',
            data: {
                _id: '',
                age: 0,
                dpi: 0,
                email: '',
                lastname: '',
                name: '',
                password: '',
                username: ''
            },
        }

        jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.resolve(resolve));
        jest.spyOn(storage, 'getUserId').mockImplementation(() => '123456');

        const { result, waitFor } = renderHook(() => useProfileState());

        // @ts-ignore
        await act(async () => result.current.actions.updateProfile({ preventDefault: () => true }));

        waitFor(() => expect(result.current.user).toBe(resolve.data));
    })

    test('No debe actualizar el perfil del usuario porque no esta logueado. Retornar a login', async () => {
        jest.spyOn(storage, 'getUserId').mockImplementation();

        const { result, waitFor } = renderHook(() => useProfileState());

        // @ts-ignore
        await act(async () => result.current.actions.updateProfile({ preventDefault: () => true }));

        waitFor(() => expect(mockReplace).toHaveBeenCalled());
    })

    test('Debe redireccionar al login porque no esta autorizado para acceder al perfil (No logueado o token vencido)', async () => {
        const resolve = {
            ok: false,
            statuscode: 401, // No authorized
            message: 'No autorizado',
            data: {},
        }

        jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.resolve(resolve));
        jest.spyOn(storage, 'getUserId').mockImplementation(() => '123456');

        const { waitFor } = renderHook(() => useProfileState());

        waitFor(() => expect(mockReplace).toHaveBeenCalled());
    })

    test('Debe dar error al atualizar el perfil del usuario', async () => {
        jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.reject(new Error('Ha ocurrido un error de servidor')));
        jest.spyOn(storage, 'getUserId').mockImplementation(() => '123456')

        const { result, waitFor } = renderHook(() => useProfileState());

        // @ts-ignore
        await act(async () => result.current.actions.updateProfile({ preventDefault: () => true }));
        waitFor(() => expect(result.current.updating).toBeFalsy());
    })
});
