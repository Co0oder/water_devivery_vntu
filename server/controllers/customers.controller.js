const customersModule = require('../models/customers.model');
const { validationResult } = require('express-validator');

module.exports = {
    show: async (req,res) => {
        let data = await customersModule.showAllCustomer();
        data = data.map(customer => ({...customer, phone: '38' + customer.phone}));
        res.json({data});
    },

    add: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const props = req.body;
        const data = await customersModule.addNewCustomer(props);
        res.json({data});
    },

    update: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const id = req.params.id;
        const props = req.body;
        const data = await customersModule.updateCustomer(id,props);
        res.json({data});
    },
    delete: async (req,res) => {
        const id = req.params.id;
        await customersModule.deleteCustomerById(id);
        res.json({message: `Customer with id: ${id} deleted`});
    }
}