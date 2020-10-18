const apiUrl = 'http://localhost:4000/api';

async function callApi({ uri, method = 'GET', body = {} }: Props) {
    const httpResponse = await fetch(apiUrl + uri, {
        method, body: JSON.stringify(body), headers: {
            "Content-Type": 'application/json'
        }
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
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    body?: object
}

export default {
    callApi
}