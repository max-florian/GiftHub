import React from 'react';
import { act as act_render, render } from '@testing-library/react';

import Inventory, {Item} from './index';
import {card} from '../catalog.mock'

jest.mock('../../../hooks/globalState', () => ({
    useLoggedState: () => ({ setLogged: () => { } }),
    useUserIdState: () => ({ setUserId: () => { } })
}))

const mockReplace = jest.fn();
const mockPush = jest.fn();
jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn().mockImplementation(() => {
            return {
                replace: mockReplace,
                push: mockPush
            }
        })
    }
})

describe("Catalogo de admin giftcards", () => {

    describe("Vista de Componentes", () => {
        test("Inventario renderiza correctamente", async () => {
            await act_render(async () => {
                render(<Inventory/>)
            })
        })
    
        test("Item renderiza correctamente", () => {
            render(<Item card={card}/>)
        })
    })
})