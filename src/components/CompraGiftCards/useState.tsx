import { ChangeEvent, MouseEvent as EventMouse, useState, useEffect } from "react";
import {CardInterface} from './card'


export default function cardsState() {
    const [cards, setCards] = useState<Array<CardInterface>>(new Array<CardInterface>());
    useEffect(() => {
        let cards2: Array<CardInterface>;
        fetch("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card")
        .then(res => res.json())
        .then((result) => {
                setCards(result)
            },
            (error) => {
                console.log(error)
                setCards(new Array<CardInterface>())
            }
        )
        .then(
            () => fetch("https://my-json-server.typicode.com/CoffeePaw/AyD1API/Value")
        )
    }, []);

    return {
        cards:{
            val:cards
        }
    }
}