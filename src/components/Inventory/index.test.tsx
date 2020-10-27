import React from 'react';
import Inventory, {cart, total, Item, Counter, Card, addToCart} from '.'
import {fetchFromAPI, useCounterState, useInventoryState, useItemState} from './state'
import { act as act_render, render } from '@testing-library/react';
import { act as act_hook, renderHook} from '@testing-library/react-hooks'

const card: Card = {
    id: "1",
    name: "Google Play",
    image: "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
    chargeRate: 1,
    active: true,
    availability: [1,2,3,4],
    value:50
}

const API_Card = [
    {
      "id": "1",
      "name": "Google Play",
      "image": "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
      "chargeRate": 1,
      "active": false,
      "availability": [
        1,
        2,
        4
      ]
    },
    {
      "id": "2",
      "name": "PlayStation",
      "image": "https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
      "chargeRate": 0.25,
      "active": true,
      "availability": [
        1,
        3
      ]
    }]

const API_Value = [
    {
      "id": "1",
      "total": "10"
    },
    {
      "id": "2",
      "total": "25"
    },
    {
      "id": "3",
      "total": "50"
    },
    {
      "id": "4",
      "total": "100"
    }
  ]

const fetchMock = jest.fn<any, any>((input) => {
    if(input.toString() == "https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card"){
        return Promise.resolve({
            json: () => Promise.resolve(API_Card)
        })
    }
    else if(input.toString() == "https://my-json-server.typicode.com/CoffeePaw/AyD1API/Value"){
        return Promise.resolve({
            json: () => Promise.resolve(API_Value)
        })
    }
    else{
        return Promise.reject("Bad endpoint");
    }
})

global.fetch = fetchMock;

describe("Catalogo de giftcards", () => {

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
    }),

    describe('Procesamiento de datos recibidos por API', () => {
        test('Si endpoint /Card esta abajo el catalogo debe estar vacio', (done) => {
            fetchMock.mockImplementationOnce(() => Promise.reject("API is down"));

            function setCatalogo(newCatalogo:Array<Card>){
                expect(newCatalogo.length).toBe(0);
                done();
            }

            fetchFromAPI(setCatalogo);
        })

        test('Si endpoint /Value esta abajo el catalogo debe estar vacio', (done) => {
            fetchMock
                .mockImplementationOnce(() => Promise.resolve({json: () => Promise.resolve(API_Card)}))
                .mockImplementationOnce(() => Promise.reject("API is down"));

            function setCatalogo(newCatalogo:Array<Card>){
                expect(newCatalogo.length).toBe(0);
                done();
            }

            fetchFromAPI(setCatalogo);
        })

        test('Resultado de ambos endpoints se combina correctamente', (done) => {

            function setCatalogo(newCatalogo:Array<Card>){
                const expectedLength = API_Card[0].availability.length + API_Card[1].availability.length;
                expect(newCatalogo.length).toBe(expectedLength);

                const expectedValue = API_Value.find(x => Number(x.id) === API_Card[0].availability[0])?.total;
                expect(newCatalogo[0].value).toBe(expectedValue)
                done();
            }

            fetchFromAPI(setCatalogo);
        })
    })

    
})