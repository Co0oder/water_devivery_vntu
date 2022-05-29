const knex = require('../db');
const moment = require('moment')

function transformOrder(order) {
    return {
        name: order.name,
        phone: order.phone,
        address: order.address,
        house_number: order.house_number,
        ...(order.flat_number) ? {flat_number: order.flat_number} : {},
        ...(order.comment) ? {comment: order.comment} : {},
        ...(order.region) ? {region: order.region} : {},
        items: order.items,
        price: order.price,
        delivery_date: moment(order.delivery_date,'DD-MM-YY').format().toLocaleString(),
        delivery_time: order.delivery_time,
    }
}

module.exports = {
    showAllOrders: () => knex('orders').select(),
    showAllForStatistic: () => knex('orders').select('name', 'phone', 'address', 'house_number', 'flat_number', 'delivery_date','delivery_time'),
    addNewOrder: (props) => knex('orders').insert(transformOrder(props)).orderBy('id','desc'),
    deleteOrderById: (id) => knex('orders').where({id}).del(),
    getCustomerOrder: (phone) => knex('orders').select().where({phone}),
}