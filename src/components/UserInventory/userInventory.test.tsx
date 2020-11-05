import React from 'react';
import { } from "react-test-renderer";
import { render } from '@testing-library/react';
import { renderHook, act } from "@testing-library/react-hooks";
import Profile from '.';
import {useInventoryState} from "./userInventoryState";
import utils from "../../utils/callApi";

const mockgoBack = jest.fn().mockImplementation();
const mockReplace = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn().mockImplementation(() => {
            return {
                replace: mockReplace,
                goBack: mockgoBack,
                push: jest.fn()
            }
        })
    }
})

jest.mock('../../hooks/globalState', () => ({
    useLoggedState: () => ({ setLogged: () => { } }),
    useUserIdState: () => ({ setUserId: () => { } })
}))

describe('Pantalla de Perfil', () => {
    test('Debe renderizar Correctamente', () => {
        const { getByText } = render(<Profile />);
        const texto = getByText(/Inventario/i);
        expect(texto).toBeInTheDocument;
    });


    // test('Debe redirigir hacia atras usando history de react-router-dom', async () => {
    //     const { result } = renderHook(() => useInventoryState());

    //     //@ts-ignore
    //     await act(async () => result.current.actions.goBack());
    //     expect(mockgoBack).toHaveBeenCalled();
    // })

//     test('Debe actualizar el perfil del usuario', async () => {
//         const resolve = {
//             ok: true,
//             statuscode: 200,
//             message: 'Sesion iniciada',
//             data: {
//                 _id: '',
//                 age: 0,
//                 dpi: 0,
//                 email: '',
//                 lastname: '',
//                 name: '',
//                 password: '',
//                 username: ''
//             },
//         }

//         jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.resolve(resolve));
//         jest.spyOn(storage, 'getUserId').mockImplementation(() => '123456');

//         const { result, waitFor } = renderHook(() => useInventoryState());

//         // @ts-ignore
//         await act(async () => result.current.actions.updateProfile({ preventDefault: () => true }));

//         waitFor(() => expect(result.current.user).toBe(resolve.data));
//     })

//     test('No debe actualizar el perfil del usuario porque no esta logueado. Retornar a login', async () => {
//         jest.spyOn(storage, 'getUserId').mockImplementation();

//         const { result, waitFor } = renderHook(() => useInventoryState());

//         // @ts-ignore
//         await act(async () => result.current.actions.updateProfile({ preventDefault: () => true }));

//         waitFor(() => expect(mockReplace).toHaveBeenCalled());
//     })

//     test('Debe redireccionar al login porque no esta autorizado para acceder al perfil (No logueado o token vencido)', async () => {
//         const resolve = {
//             ok: false,
//             statuscode: 401, // No authorized
//             message: 'No autorizado',
//             data: {},
//         }

//         jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.resolve(resolve));
//         jest.spyOn(storage, 'getUserId').mockImplementation(() => '123456');

//         const { waitFor } = renderHook(() => useInventoryState());

//         waitFor(() => expect(mockReplace).toHaveBeenCalled());
//     })

//     test('Debe dar error al atualizar el perfil del usuario', async () => {
//         jest.spyOn(utils, 'callApi').mockImplementation(() => Promise.reject(new Error('Ha ocurrido un error de servidor')));
//         jest.spyOn(storage, 'getUserId').mockImplementation(() => '123456')

//         const { result, waitFor } = renderHook(() => useInventoryState());

//         // @ts-ignore
//         await act(async () => result.current.actions.updateProfile({ preventDefault: () => true }));
//         waitFor(() => expect(result.current.updating).toBeFalsy());
//     })
 });