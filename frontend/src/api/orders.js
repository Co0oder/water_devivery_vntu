import fetch from '../helpers/fetch';
import urls from './urls/urls';

export async function getOrdersAction() {
    const response = await fetch(urls.orders,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}
export async function saveOrderAction(order) {
    if (!order) throw new Error('No order!');

    const response = await fetch(urls.orders,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(order),
        })
    return response.json();
}

export async function deleteOrderAction(id) {
    if (!id) throw new Error('No id!');

    const response = await fetch(urls.orders + id,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}
