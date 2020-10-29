import React, { useState, useEffect } from 'react';
import TransactionLog from '..';
import utils from '../../../utils/callApi';

export default function TransactionAdmin(){

    const [data, setData] = useState(new Array<any>());

    useEffect(() => {
        utils.callApi({
            uri: '/transactionLog/admin',
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