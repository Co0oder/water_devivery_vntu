const order = require('../mock-data');
const regions = require('./regions.json');
const items = require('./items.json');
const reviews = require('./reviews.json');
const customers = require('./customers.json');

exports.seed = function(knex) {
  return knex('regions').del()
    .then(function () {
      return knex('regions').insert(regions);
    })
    // .then(function() {
    //   return knex('items').del()
    // })
    // .then(function () {
    //   return knex('items').insert(items);
    // })
    .then(function() {
      return knex('reviews').del()
    })
    .then(function () {
      return knex('reviews').insert(reviews);
    })
    .then(function() {
      return knex('customers').del()
    })
    .then(function () {
      return knex('customers').insert(customers);
    });
};