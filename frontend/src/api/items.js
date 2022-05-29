import fetch from '../helpers/fetch';

export async function getItemsAction() {
    const response = await fetch('http://139.59.128.142/api/items',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}
export async function getItemsByIdAction(ids) {
    const response = await fetch(`http://139.59.128.142/api/items?ids=${ids.join(',')}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}
export async function saveItemAction(item, id = '') {
    if (!item) throw new Error('No item!');

    console.log(item)
    const response = await fetch('http://139.59.128.142/api/items/' + id,
        {
            method: 'POST',
            body: item,
        })
    return response.json();
}
export async function editItemAction(item) {
    if (!item) throw new Error('No item!');

    const response = await fetch('http://139.59.128.142/api/items',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(item),
        })
    return response.json();
}
export async function deleteItemAction(id) {
    if (!id) throw new Error('No id!');

    const response = await fetch('http://139.59.128.142/api/items/'+ id,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
    return response.json();
}
