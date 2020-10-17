import React from "react"
import {useInventoryState, useItemState} from "./state"

export interface Card {
    id: string,
    name: string,
    image: string,
    chargeRate: number,
    active: boolean,
    availability: Array<number>
}

const dataQuemada: Card = {
    id: "1",
    name: "Google Play",
    image: "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
    chargeRate: 1,
    active: true,
    availability: [
      1,
      2,
      3,
      4
    ]
  }

export function Counter(){
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button className="btn btn-primary" type="button">-</button>
            </div>
            <input type="number" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
            <div className="input-group-append">
                <button className="btn btn-primary" type="button">+</button>
            </div>
        </div>
    )
}

export function Item({card}: {card:Card}){
    const state = useItemState();

    return (
        <div className="card h-100 w-100">
            <img className="card-img-top h-75" src={card.image}/>
            <div className="card-body">
                <h5 className="card-title text-center">{card.name}</h5>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <Counter/>
                    </div>         
                </div>
                <div className="row">
                        <button className="btn btn-block btn-primary">Comprar</button>
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
            {items.value.map((item, index) => {
                return (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-center justify-content-center mt-5">
                        <Item card={item}/>
                    </div>
                )
            })}
        </div>
    )
}