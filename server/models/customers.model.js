const { update } = require('../db');
const knex = require('../db');

const CUSTOMER_FIELDS = [
    'name',
    'address',
    'phone',
    'region',
    'house_number'
]

function createCustomerFromOrder(order){
    return {
        name: order.name,
        phone: order.phone.substr(order.phone.length - 10),
        address: order.address,
        house_number:`${order.house_number}${order.flat_number && ` кв. ${order.flat_number}`}`,
        ...(order.region) ? {region: order.region} : {},
    }
}

module.exports = {
    showAllCustomer: () => knex('customers').select(),
    showPaginatedCustomers: async (page,selectBy, orderBy ) => {
        let selectParams = {
            orderBy: 'name',
            select: {},
        };
        const [{customersAmount}] = await knex('customers').count('*',{as: 'customersAmount'}).select().where(selectParams.select).orderBy(selectParams.orderBy)
        let paginationParams = {
            page: 0,
            items: 10,
        }
       // if(CUSTOMER_FIELDS.includes(orderBy))
       // return knex('customers').select()
    },
    getCustomerByPhone: (phone) => knex('customers')
        .select('name', 'phone', 'region')
        .where('phone','like',phone.substr(phone.length - 10)),
        
    addNewCustomer: (props) => {
        return knex('customers').insert(createCustomerFromOrder(props))
        .onConflict("phone")
        .merge().then(id => id);
    },
    deleteCustomerById: (id) => knex('customers').where({id}).del(),

    updateCustomer: (id,props) => {
        return knex('customers').update({
            name: props.name,
            address: props.address,
            phone: props.phone,
            ...(props.region ? {region: props.region} : {}),
        }).where({id});
    }
}



