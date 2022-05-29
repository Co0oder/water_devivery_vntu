import fetch from '../helpers/fetch';
import urls from './urls/urls';

const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
};

export async function getReviews() {
    const response = await fetch(urls.reviews,
        {
            method: 'GET',
            headers
        })
    return response.json();
}
