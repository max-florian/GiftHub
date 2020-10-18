import React ,{useState}from "react";
export function useElements() {
    const [id, setid] = useState(0);
    const [added, setadded] = useState(0);

    //Eventos de cambio de inputs
   
    return {
    }
}

export interface CardInterface {
    id: string,
    name: string,
    image: string,
    chargeRate: number,
    active: boolean,
    availability: Array<number>,
    price?: number
}

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

export default function Card(props:any) {
    function addTocart(){

    }

    return (
        <div className='card'> 
            <img className="card-img-top" src={props.image} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title" style={{color:"black"}}>{props.name}</h5>
                <p className="card-text" style={{color:"black"}}>Info</p>
                <button className="btn btn-success" type="button" >
                <i className="fas fa-cart-plus"></i> Comprar
                </button>
                {/* <div className="input-group">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button">-</button>
                        <button className="btn btn-outline-secondary" type="button">+</button>
                    </div>
                    <input type="text" className="form-control" placeholder="0" aria-label="Recipient's username" aria-describedby="basic-addon2" readOnly/>
                    <div className="input-group-append">
                        <button className="btn btn-success" type="button" >
                            <span className="fa fa-cart"></span> Agregar
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
        
    )
}