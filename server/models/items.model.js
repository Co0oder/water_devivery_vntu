const knex = require('../db');

const datePipe = (props) => {
    return {
        title: props.title,
        description: props.description,
        details: props.details,
        price: props.price,
        ...(props.order ? { order: props.order} : {}),
        ...(props.image ? { image: props.image} : {}),   
    }
}


module.exports = {
    showAllItems: () => knex('items').select().orderBy('order'),
    addNewItems:  (props, image) => knex('items').insert(datePipe(props, image)).returning('id')
        .then(([id]) =>{
            return knex('items').where('id',id)
        }),
    updateItem: (props, id) => knex('items').update(datePipe(props)).where({id}).returning('id')
        .then(([id]) =>{
            return knex('items').where('id',id)
        }),
    getItemById: (id) => knex('items').select().where({id}),
    deleteItemsById: (id) => knex('items').where({id}).del(),
}