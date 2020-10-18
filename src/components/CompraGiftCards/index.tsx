import React,{useEffect} from "react";
import cardsState from "./useState";
import Card from "./card"



export default function CompraGiftCards() {
    const cards = cardsState();
    return (
        <div className='container-fluid'> 
            <div className='row'>
            {cards.map((answer, i) => {     
                console.log("Entered");                 
                // Return the element. Also pass key     
                return (<Answer key={i} answer={answer} />) 
            })}
            </div>
        </div>
    )
}