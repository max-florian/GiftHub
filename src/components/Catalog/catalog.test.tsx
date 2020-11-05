import React from 'react'
import {Card} from './index';
import {fetchFromAPI} from './state'
import {fetchMock, API_Card, API_Value} from './catalog.mock';


describe('Procesamiento de datos recibidos por API', () => {
    test('Si endpoint /Card esta abajo el catalogo debe estar vacio', (done) => {
        fetchMock.mockImplementationOnce(() => Promise.reject("API is down"));

        function setCatalogo(newCatalogo:Array<Card>){
            try{
                expect(newCatalogo.length).toBe(0);
                done();
            }catch(err){done(err)}
        }

        fetchFromAPI(setCatalogo);
    })

    test('Si endpoint /Value esta abajo el catalogo debe estar vacio', (done) => {
        fetchMock
            .mockImplementationOnce(() => Promise.resolve({json: () => Promise.resolve(API_Card)}))
            .mockImplementationOnce(() => Promise.reject("API is down"));

        function setCatalogo(newCatalogo:Array<Card>){
            try{
                expect(newCatalogo.length).toBe(0);
                done();
            }catch(err){done(err)}
        }

        fetchFromAPI(setCatalogo);
    })

    test('Catalogo retorna la cantidad correcta de items', (done) => {

        function setCatalogo(newCatalogo:Array<Card>){
            try{
                var expectedLength = 0;
                
                API_Card.forEach(card => {
                    expectedLength += card.availability.length;
                });
                
                expect(newCatalogo.length).toBe(expectedLength);
                done();
            }
            catch(err){
                done(err);
            }
        }

        fetchFromAPI(setCatalogo);
    })

    test('Catalogo expone un item por cada valor de tarjeta', (done) => {

        function setCatalogo(newCatalogo:Array<Card>){
            try{
                const card = API_Card[0];
                card.availability.forEach(valueID => {
                    const value = Number(API_Value.find(x => Number(x.id) === valueID)?.total);
                    
                    const catalogEntry = newCatalogo.find(item => item.value === value && item.id === card.id);
                    expect(catalogEntry).not.toBeUndefined()
                })
                done();
            }
            catch(err){
                done(err);
            }
        }

        fetchFromAPI(setCatalogo);
    })
})
