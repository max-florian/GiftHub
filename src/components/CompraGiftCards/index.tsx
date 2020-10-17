import React from "react";

export default function CompraGiftCards() {
    
    function callsd() {
        fetch('https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (

        <div className='container-fluid'> 
            <button onClick={callsd} className='btn btn-success'>Hello</button>
        </div>
        
    )
}