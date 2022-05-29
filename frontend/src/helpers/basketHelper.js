import {setToLocal} from "./localStorage.js";

const addToBasket = (id) => {
    const itemsString = localStorage.getItem('items');
    if (itemsString) {
        const items= itemsString.split(',');
        if (!items.includes(id)){
            setToLocal({ items: [...items, id].join(',') });
        }
    } else {
        setToLocal({ items: id });
    }
}

const deleteFromBasket = (id) => {
    const itemsString = localStorage.getItem('items');
    if (itemsString) {
        const items = itemsString.split(',');
        setToLocal({ items: items.filter(itemId => +itemId !== id).join(',') });
    }
}

const deleteAllFromBasket = (id) => {
    setToLocal({ items: '' });
}

const getItemsFromBasket = () => {
    const items = localStorage.getItem('items');
    if (items) return items.split(',').map(Number);
    return [];
}

export {
    addToBasket,
    deleteFromBasket,
    getItemsFromBasket,
    deleteAllFromBasket
}

