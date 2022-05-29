import fetch from '../helpers/fetch';

export async function getCustomersAction() {
    const response = await fetch('http://139.59.128.142/api/customers',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}

export async function addCustomerAction(customer) {
    if (!customer) throw new Error('No customer!');

    const response = await fetch('http://139.59.128.142/api/customers',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(customer),
        })
    return response.json();
}

export async function deleteCustomerAction(id) {
    if (!id) throw new Error('No id!');

    const response = await fetch('http://139.59.128.142/api/customers/'+ id,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}
