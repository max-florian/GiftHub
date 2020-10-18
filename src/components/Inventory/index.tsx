import React, { ChangeEvent } from "react"
import {useInventoryState, useItemState} from "./state"

export interface Card {
    id: string,
    name: string,
    image: string,
    chargeRate: number,
    active: boolean,
    availability: Array<number>,
    price?: number
}

export function Counter({amount, setAmount}: {amount:any, setAmount:any}){

    function increaseAmount(){
        setAmount(amount + 1);
    }

    function decreaseAmount(){
        setAmount(amount - 1);
    }

    function changeAmount(event: ChangeEvent<HTMLInputElement>){
        setAmount(event.target.value)
    }

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button disabled={amount == 0} className="btn btn-primary" type="button" onClick={decreaseAmount}>-</button>
            </div>
            <input 
                type="number"
                className="form-control text-center" 
                value={amount}
                onChange={changeAmount}/>
            <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={increaseAmount}>+</button>
            </div>
        </div>
    )
}

export function Item({card}: {card:Card}){
    const state = useItemState();
    const amount = state.amount;

    const price:number = card.price || 0;
    const retailPrice:number = price + (price * card.chargeRate);

    return (
        <div className="card w-100">
            <img className="card-img-top h-50" src={card.image} style={{minHeight:350, maxHeight:350}}/>
            <div className="card-body">
                <h5 className="card-title text-center">{card.name} ${price}</h5>
                <p className="text-center">Precio: ${(Math.round(retailPrice * 100) / 100).toFixed(2)}</p>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <Counter amount={amount.val} setAmount={amount.set}/>
                    </div>
                </div>
                <div className="row">
                    <button disabled={!card.active} className="btn btn-block btn-primary">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    )
}

export default function Inventory(){
    const state = useInventoryState();
    const items = state.items;

    return (
        <div className="row">
            {items.val.map((item, index) => {
                return (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-center justify-content-center mt-5">
                        <Item card={item}/>
                    </div>
                )
            })}
        </div>
    )
}