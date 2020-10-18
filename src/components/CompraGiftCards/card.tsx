import React from "react";
import compraState from "./useState";

export function getDAta() {
    let resp;
    new Promise((resolve, reject) => {
        fetch('https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) =>{
            resp = responseJson;
        } )
        .catch((error) => {
            console.error(error);
        });
    })
    return resp;
}

export default function Card() {
    return (

        <div className='card'> 
            <img className="card-img-top" src="https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg" alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title" style={{color:"black"}}>Google Play</h5>
                <p className="card-text" style={{color:"black"}}>Info</p>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button">-</button>
                        <button className="btn btn-outline-secondary" type="button">+</button>
                    </div>
                    <input type="text" className="form-control" placeholder="0" aria-label="Recipient's username" aria-describedby="basic-addon2" readOnly/>
                    <div className="input-group-append">
                        <button className="btn btn-success" type="button">
                            <span className="fa fa-cart"></span> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}