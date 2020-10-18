import {useEffect, useState} from "react"
import {Card} from "."

export function useItemState(){
    const [amount, setAmount] = useState<number>(0);
    return {
        amount: {
            val: amount,
            set: setAmount
        }
    };
}

export function useInventoryState(){

    const [items, setItems] = useState<Array<Card>>(new Array<Card>())

    useEffect(() => {
        let cardsAvailable: Array<Card>;

        fetch("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card")
        .then(res => res.json())
        .then(
            (result) => {
                cardsAvailable = result;
            },
            (error) => {
                setItems(new Array<Card>())
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
                        item.price = Number(result.find((x:any) => x.id == valueId).total)
                        itemsExpanded.push(item);
                    })
                });

                setItems(itemsExpanded);
            },
            (error) => {
                setItems(new Array<Card>())
            }
        )
    }, []);

    return {
        items: {
            val: items,
        }
    }
    
}