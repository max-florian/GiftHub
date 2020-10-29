import {useState, useEffect} from "react"
import useSessionController from "../../hooks/useSessionController";
import {Card} from "./index"

export function useInventoryState(){
    const [items, setItems] = useState<Array<Card>>(new Array<Card>())

    useEffect(() => {
        fetchFromAPI(setItems);
    }, []);

    return {
        items: {
            val: items,
        }
    }
    
}

export function fetchFromAPI(setItems:any){
    let cardsAvailable: Array<Card>;

    fetch("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card")
    .then(res => res.json())
    .then(
        (result) => {
            cardsAvailable = result;
        },
        (error) => {
            setItems(new Array<Card>())
            return Promise.reject(error);
        }
    )
    .then(
        () => fetch("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Value")
    )
    .then(res => res.json())
    .then(
        (result) => {

            let itemsExpanded = new Array<Card>();
            cardsAvailable.forEach(card => {
                card.availability.forEach(valueId => {
                    let item = {...card}
                    item.value = Number(result.find((x:any) => Number(x.id) === valueId).total)
                    itemsExpanded.push(item);
                })
            });

            setItems(itemsExpanded);
        },
        (error) => {
            setItems(new Array<Card>())
            return Promise.reject(error);
        }
    )
    .catch((err) => {
        //do nothing, already handled
    })
}