import fetch from '../helpers/fetch';
import urls from './urls/urls';

export async function getCalls() {
    const response = await fetch(urls.calls,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}
export async function sendCollData(coll) {
    if (!coll) throw new Error('No coll!');

    const response = await fetch(urls.calls,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(coll),
        })
    return response.json();
}
