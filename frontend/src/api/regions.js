import fetch from '../helpers/fetch';
import urls from './urls/urls';

const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
};

export async function getRegions() {
    const response = await fetch(urls.regions,
        {
            method: 'GET',
            headers
        })
    return response.json();
}
export async function createRegion(region) {
    if (!region) throw new Error('No region!');

    const response = await fetch(urls.regions,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(region),
        })
    return response.json();
}
