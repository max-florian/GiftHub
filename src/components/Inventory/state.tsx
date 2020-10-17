import {useEffect, useState} from "react"
import {Card} from "."

export function useItemState(){
    return {};
}

export function useInventoryState(){

    const [items, setItems] = useState<Array<Card>>(new Array<Card>())

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card")
        .then(res => res.json())
        .then(
            (result) => {
                setItems(result);
            },
            (error) => {
                setItems(new Array<Card>())
            }
        )
    }, []);

    return {
        items: {
            value: items,
            set: setItems
        }
    }
    
}