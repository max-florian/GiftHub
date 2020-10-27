import {ChangeEvent, useEffect, useState} from "react"
import {Card} from "."

export function useCounterState(){
    const [amount, setAmount] = useState<number>(1);

    function increaseAmount(){
        setAmount(amount + 1);
    }

    function decreaseAmount(){
        setAmount(amount - 1);
    }

    function changeAmount(event: ChangeEvent<HTMLInputElement>){
        setAmount(Number(event.target.value))
    }
    
    return {
        amount: {
            val: amount,
            increase: increaseAmount,
            decrease: decreaseAmount,
            change: changeAmount
        }
    };
}

export function useItemState(){
    const amountState = useCounterState();

    return amountState;
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
                        item.value = Number(result.find((x:any) => Number(x.id) === valueId).total)
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