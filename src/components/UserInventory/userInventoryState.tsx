import {useEffect, useState} from "react"
import {UserCard} from "."
import utils from  '../../utils/callApi'
import { getToken } from "../../utils/storage";

export function useCardState(){
    const [amount, setAmount] = useState<number>(0);
    return {
        amount: {
            val: amount,
            set: setAmount
        }
    };
}

export function useInventoryState(){
    const [items, setItems] = useState<Array<UserCard>>(new Array<UserCard>())
    const [errorMessage, setErrorMessage] = useState<string>('')
    const user = getToken();
    useEffect(() => {
        let cardsAvailable: Array<UserCard>;
        utils.callApi({
            uri: '/userCards/get',
            method: 'POST',
            body: {
                user: "5f8687c57ae02f2fe580161a",
            }
        }).then((response) => {
            if (!response.ok){
                setErrorMessage(response.message);
                setItems(new Array<UserCard>())
            }
            else {
                setErrorMessage('');
                setItems(response.data);
            };
        });
    }, []);

    return {
        items: {
            val: items,
            error: errorMessage
        }
    }
    
}