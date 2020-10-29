import { getToken } from "./storage";

const apiUrl = 'http://localhost:4000/api';

async function callApi({ uri, method = 'GET', body = {}, sendToken = true }: Props) {
    let headers: any = {
        "Content-Type": 'application/json',
    }

    if (sendToken) {
        headers["Authorization"] = 'Bearer ' + getToken();
    }

    const httpResponse = await fetch(apiUrl + uri, {
        method,
        body: method === 'GET' ? null : JSON.stringify(body),
        headers
    })

    const response = await httpResponse.json();

    return {
        ok: response.ok,
        statuscode: response.statuscode,
        message: response.message,
        data: response.data,
    };
}

type Props = {
    uri: string,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
    body?: object,
    sendToken?: boolean,
}

export default {
    callApi
}