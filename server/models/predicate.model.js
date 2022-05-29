const knex = require('../db');

module.exports = {
    getPredicatedByDate: (predicated_date) => knex('predicate')
        .select('user_id')
        .where({predicated_date}),
        
    createPredicate: (predicate) => knex('predicate').insert(predicate),

    updatePredicate: (predicate,user_id)=> knex('predaicate')
        .update(predicate)
        .where({user_id}),

    deletePredicateById: (id) => {
        return knex('predicate').where({id}).del();
    },
}