import AbortController from 'abort-controller';
const BACKEND_URL = 'http://localhost:4000';

export const controller = new AbortController();
const signal = controller.signal;

export function fetchJson(path) {
    const url = `${BACKEND_URL}${path}`;

    return fetch(url, {signal})
        .then(response => {
            return response.json();
        })
        .catch(ex => console.log('parsing failed', ex));
}

export function sendJson(method, path, payload) {
    const url = `${BACKEND_URL}${path}`;

    return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal
    }).then(response => {
        return response.json();
    }).catch(ex => console.log('parsing failed', ex));
}