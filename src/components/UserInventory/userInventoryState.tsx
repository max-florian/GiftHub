import {useEffect, useState} from "react"
import {UserCard} from "."
import utils from  '../../utils/callApi'
import { useHistory } from "react-router-dom";
import { getUserId } from "../../utils/storage";
import useSessionController from "../../hooks/useSessionController";

export function transfer(user:string, cardid:string){
    console.log(user);
    console.log(cardid);
    
}



export function useCardState(){
    const [user, setUser] = useState<string>("");
    const [cardid, setcardid] = useState<string>("");
    const transferir = transfer(user,cardid)
    const  setUsers = (usr:string) => {
        setUser(usr)
    }
    const setCardid = (card:string)=>{
        setcardid(card)
    }
    return {
        card: {
            user: user,
            setUsers: setUsers,
            setCardId: setCardid
            
        },
        transferir
    };
}

export function useInventoryState(){
    useSessionController({});
    const [items, setItems] = useState<Array<UserCard>>(new Array<UserCard>())
    const [errorMessage, setErrorMessage] = useState<string>('')
    const userId = getUserId();
    const history = useHistory();
    useEffect(() => {
        if (!userId) return history.replace('/');
        try{
            utils.callApi({
                uri: '/userCards/'+userId,
                method: 'GET',
                body: {}
            }).then((response) => {
                if (!response.ok){
                    setErrorMessage(response.message);
                    setItems(new Array<UserCard>())
                }
                else {
                    setErrorMessage('');
                    setItems(response.data.cards);
                };
            });
        }catch(Exception){
            console.log("fail")
            setErrorMessage('Hubo un problema al cargar las tarjetas')
        }
        
    }, []);

    return {
        items: {
            val: items,
            error: errorMessage
        }
    }
    
}