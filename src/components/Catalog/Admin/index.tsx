import React from "react"
import useSessionController from "../../../hooks/useSessionController";
import {Card} from '../index';
import {useInventoryState} from '../state'

export function Item({card}: {card:Card}){

    const value:number = card.value || 0;
    const retailPrice:number = value + (value * card.chargeRate);

    return (
        <div className="card w-100">
            <img className="card-img-top h-50" src={card.image} style={{minHeight:350, maxHeight:350}} alt=""/>
            <div className="card-body">
                <h5 className="card-title text-center">{card.name} ${value}</h5>
                <p className="text-center">
                    Margen Ganancia: {(Math.round(card.chargeRate * 100))}%<br/>
                    Precio de Venta: ${(Math.round(retailPrice * 100) / 100).toFixed(2)}<br/>
                    Disponible: {card.active ? "Si" : "No"}<br/>
                </p>
            </div>
        </div>
    )
}

export default function Inventory(){
    useSessionController({adminOnly: true});
    const state = useInventoryState();
    const items = state.items;

    return (
        <div className="mx-4"style={{padding: 20}}>
            <div className="row">
                {items.val.map((item, index) => {
                    return (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-center justify-content-center mt-5">
                            <Item card={item}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

