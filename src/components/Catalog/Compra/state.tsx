import {ChangeEvent, useState} from "react"

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