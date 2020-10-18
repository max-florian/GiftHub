import React from "react";
import compraState from "./useState";
import Card from "./card"

export function getDAta() {
    let resp:any = [];
    new Promise((resolve, reject) => {
        fetch('https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) =>{
            for (let index = 0; index < responseJson.length; index++) {
                resp.push(<div className='col-md-3'>
                <           Card></Card>
                        </div>)
            }
            console.log("1")
        } )
        .catch((error) => {
            console.error(error);
        });
    })
    console.log("2")
    return resp;
}

export default function CompraGiftCards() {
    let cards = getDAta();
    return (

        <div className='container-fluid'> 
            <div className='row'>
                
                {cards}
                <div className= 'col-md-9'></div>
            </div>
        </div>
        
    )
}