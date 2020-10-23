const keys = {
    token: 'token',
    userId: 'user',
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

export function saveUserId(id: string) {
    localStorage.setItem(keys.userId, id);
}

export function getUserId() {
    return localStorage.getItem(keys.userId);
}