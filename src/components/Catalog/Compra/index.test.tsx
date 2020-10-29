import React from 'react';
import Inventory, {cart, total, Item, Counter, addToCart} from '.'
import {useCounterState, useItemState} from './state'
import { act as act_render, render } from '@testing-library/react';
import { act as act_hook, renderHook} from '@testing-library/react-hooks'

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

describe("Catalogo de compra de giftcards", () => {

    describe("Vista de Componentes", () => {
        test("Inventario renderiza correctamente", async () => {
            await act_render(async () => {
                render(<Inventory/>)
            })
        })
    
        test("Item renderiza correctamente", () => {
            render(<Item card={card}/>)
        })
    
        test("Counter renderiza correctamente", () => {
            const { result } = renderHook(() => useCounterState());
    
            render(<Counter amount={result.current.amount}/>)
        })
    }),

    describe("Interactividad de componentes", () => {
        test("Se añade giftcard al carrito", () => {
            cart.length = 0;
            addToCart(card, 3);
            expect(cart.length).toBe(3);
            expect(total).toBe(300);
        })
    }),
    
    describe('Estado para el counter', () => {
    
        test('Estado inicializa en 1', () => {
            const { result } = renderHook(() => useCounterState());
            expect(result.current.amount.val).toBe(1);
        })
    
        test('Estado incrementa, decrementa y actualiza correctamente', () => {
    
            const { result } = renderHook(() => useCounterState());
    
            act_hook(() => {
                result.current.amount.increase();
            })
            act_hook(() => {
                result.current.amount.increase();
            })
            expect(result.current.amount.val).toBe(3);
    
            const event:any = {target: {value:20}};
            act_hook(() => {
                result.current.amount.change(event);
            })
            expect(result.current.amount.val).toBe(20);
    
            act_hook(() => {
                result.current.amount.decrease();
            })
            expect(result.current.amount.val).toBe(19);
        })
    }),

    describe('Estado para el Item', () => {
        test('Estado inicializa en 1', () => {
            const { result } = renderHook(() => useItemState());
            expect(result.current.amount.val).toBe(1);
        })
    })
    
})