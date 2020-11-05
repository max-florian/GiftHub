import React from "react"
import { useHistory } from "react-router-dom";
import useSessionController from "../../../hooks/useSessionController";
import {Card} from "../index"
import {useInventoryState} from "../state"
import {useItemState} from "./state"

export const cart:Array<any> = [];
export var total:number = 0;

export function addToCart(card: Card, quantity: number){

    for(var i = 0; i < quantity; i++){
        cart.push({
            card_id: card.id,
            card_name: card.name,
            card_image: card.image,
            card_value: card.value + "",
            card_price: (card.value || 0) + ((card.value || 0) * card.chargeRate)
        });

        total += (card.value || 0) + ((card.value || 0) * card.chargeRate);
    }
}

export function Counter({amount}: {amount:any}){

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button disabled={amount.val === 1} className="btn btn-primary" type="button" onClick={amount.decrease}>-</button>
            </div>
            <input 
                type="number"
                className="form-control text-center" 
                value={amount.val}
                onChange={amount.change}/>
            <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={amount.increase}>+</button>
            </div>
        </div>
    )
}

export function Item({card}: {card:Card}){
    const state = useItemState();
    const amount = state.amount;

    const value:number = card.value || 0;
    const retailPrice:number = value + (value * card.chargeRate);

    function addToCartHandler(){
        addToCart(card, amount.val);
    }

    return (
        <div className="card w-100">
            <img className="card-img-top h-50" src={card.image} style={{minHeight:350, maxHeight:350}} alt=""/>
            <div className="card-body">
                <h5 className="card-title text-center">{card.name} ${value}</h5>
                <p className="text-center">Precio: ${(Math.round(retailPrice * 100) / 100).toFixed(2)}</p>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <Counter amount={amount}/>
                    </div>
                </div>
                <div className="row">
                    <button disabled={!card.active} className="btn btn-block btn-primary" onClick={addToCartHandler}>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Inventory(){
    useSessionController({});
    const state = useInventoryState();
    const items = state.items;
    var history = useHistory();

    function proceedToPaymentClickHandler(){
        var props = {
            total: total,
            carrito: cart
        }
        localStorage.setItem('total', props.total.toString())
        localStorage.setItem('carrito', JSON.stringify(props.carrito))

        history.push('/pagoTarjeta')
    }

    return (
        <div className="mx-4" style={{ padding: 20 }}>
            <div className="row">
                <button className="btn btn-block btn-primary" onClick={proceedToPaymentClickHandler}>
                    Proceder a Pago
                </button>
            </div>
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