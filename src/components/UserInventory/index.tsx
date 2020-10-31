import React from 'react'
import {useInventoryState,useCardState} from './userInventoryState'
import './flipingCard.css'

export interface UserCard {
    _id: string,
    user_id:string,
    card_id: string,
    date: Date,
    card_name: string,
    card_image: string,
    card_price?: number,
    card_value?: number,
    show: false
}

export function transfer(user:string, cardid:string){

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
        <div className="modal fade" id="detailModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Detalle Transaccion</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <label className='control-label'>Usuario</label>
                        <input className='form-control' type='text'></input>
                    </div>
                    <div className='col-md-3'></div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <button id="showmodal" type="button" data-toggle="modal" data-target="#detailModal" hidden={true}>
        </button>
        </>
    );

}

export function Item({card}: {card:UserCard}){
    const state = useCardState();
    state.card.setCardId(card.card_id)
    return (
        <div className="card w-100">
            <div className="card-header">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img className="flip-image" src={card.card_image} alt={""} />
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
                        <div className="col-8"  style={{marginTop:10, display:(card.show?'inherit':'none')}}>
                            <input className='form-control' value={state.card.user} onChange={()=>state.card.setUsers} type='text'/> 
                        </div>
                        <button className="btn btn-warning btn-block" onClick={()=>transfer(state.card.user, card.card_id)} >
                            <span className='fas fa-gift'> </span>Transferir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}