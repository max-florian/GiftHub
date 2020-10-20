import React from 'react'
import {useInventoryState, useCardState} from './userInventoryState'

export interface UserCard {
    _id: string,
    user_id:string,
    card_id: string,
    date: Date,
    card_name: string,
    card_image: string,
    card_price?: number,
    card_value?: number
}

export default function UserInventory(){    
    const {items} = useInventoryState();
    return(
        <>
        <div className='row'>
            {items.val.map((item, index) => {
                return (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-center justify-content-center mt-5">
                        <Item card={item}/>
                    </div>
                )
            })}
        </div>
        </>
    );

}

export function Item({card}: {card:UserCard}){
    const state = useCardState();
    const price:number = card.card_price || 0;

    return (
        <div className="card w-100">
            <img className="card-img-top h-50" src={card.card_image} style={{minHeight:350, maxHeight:350}}/>
            <div className="card-body">
                <h5 className="card-title text-center">{card.card_name} ${card.card_value}</h5>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <button className="btn btn-success btn-block">
                            <span className='fas fa-eye'></span>Ver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}