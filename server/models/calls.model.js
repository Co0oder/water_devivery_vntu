const knex = require('../db');

module.exports = {
    showAllCalls: () => knex('calls').select('id', 'name', 'phone'),
    addNewCalls: (props) => {
        return knex('calls').insert({
            ...(props.name ? {name: props.name} : {}),
            phone: props.phone,
        })
    },
    deleteCallById: (id) => {
        return knex('calls').where({id}).del();
    }
}



