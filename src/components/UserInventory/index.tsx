import React from 'react'
import {useInventoryState} from './userInventoryState'
import './flipingCard.css'

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
        <div className='inner-containter'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Inventario</h1>
                </div>
            </div>
            
            <div className='row'>

                {items.val.map((item, index) => {
                    return (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-center justify-content-center mt-5">
                            <Item card={item}/>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    );

}

export function Item({card}: {card:UserCard}){
    //const state = useCardState();
    //const price:number = card.card_price || 0;

    return (
        <div className="card w-100">
            <div className="card-header">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img className="flip-image" src={card.card_image} />
                        </div>
                        <div className="flip-card-back">
                        <p className='flip-text'><strong>{card.card_name} Card - ${card.card_value}</strong></p> 
                        <p className='flip-text'>Precio: Q. {card.card_price?.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="card-body">
                <h5 className="card-title text-center">{card.card_name} ${card.card_value}</h5>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <button className="btn btn-warning btn-block">
                            <span className='fas fa-gift'> </span>Transferir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}