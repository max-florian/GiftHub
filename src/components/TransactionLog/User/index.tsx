import React, { useState, useEffect } from 'react';
import TransactionLog from '../';
import utils from '../../../utils/callApi';
import { getUserId } from "../../../utils/storage";

export default function TransactionLogUser(){

    const [data, setData] = useState(new Array<any>());
    const userId = getUserId();

    useEffect(() => {
        utils.callApi({
            uri: `/transactionLog/${userId}`,
            method: 'GET',
        })
        .then((response) => {
            if(!response.ok){
                setData([]);
            }
            else{
                setData(response.data.docs);
            }
        })
    },[])

    return <TransactionLog dataSet={data}/>
}