import React from 'react';
import { act as act_render, render } from '@testing-library/react';

import Inventory, {Item} from './index';
import {card} from '../catalog.mock'

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