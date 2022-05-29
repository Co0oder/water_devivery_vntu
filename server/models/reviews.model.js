const knex = require('../db');

module.exports = {
    showAllReviews: () => knex('reviews').select(),
    addNewReview: (props) => knex('reviews').insert(props),
    updateReview: (id,props) => knex('reviews').update(props).where({id}),
    deleteReviewById: (id) => knex('reviews').where({id}).del(),
}