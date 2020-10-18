const keys = {
    token: 'token'
}
export function saveToken(token: string) {
    localStorage.setItem(keys.token, token);
}

export function getToken() {
    return localStorage.getItem(keys.token);
}

export function removeToken() {
    return localStorage.removeItem(keys.token);
}
