const orderModule = require('../models/orders.model');
const customerModule = require('../models/customers.model');
const { validationResult } = require('express-validator');
const { sendToTelegram } = require('../helpers/telegram.helper');
const moment = require('moment');
const customersModel = require('../models/customers.model');
const tablePdf = require('./orders-table')

function createMessage(order){
    return `
Ім'я: ${order.name}
Мобільний: ${order.phone}${order.region ? `\nРайон: ${order.region}`: ``}
Вулиця: ${order.address}
Номер будинку: ${order.house_number} ${order.flat_number ? `\nНомер квартири: ${order.flat_number}`: ``}
Товари: \n    ${order.items.join('\n    ')}
Загальна ціна: ${order.price}грн.
Дата доставки: ${moment(order.delivery_date,'DD-MM-YY').format('DD-MM-YY')}
Час доставки: ${order.delivery_time}
${order.comment && `Коментар: ${order.comment}`}
    `
}

function createTable(order){
    return `${order.name}\t${order.phone}$\t${order.region}\t${order.address}\t${order.house_number}\t${order.flat_number}\t${order.amount}\t${order.volume}\t${moment(order.delivery_date).format("MM.DD.YY")}\t${order.delivery_time}`
}

module.exports = {
    show: async (req,res) => {
        const data = await orderModule.showAllOrders();
        return res.json({data});
    },

    add: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const order = req.body;
        const customer = await customerModule.getCustomerByPhone(order.phone);
        if(customer.length < 1){
            await customersModel.addNewCustomer(order);
        }
    
        const message = `Замовлення\n${createMessage(order)}`
        await Promise.all([
            sendToTelegram(message),
            orderModule.addNewOrder(order),
        ]);
        res.status(200);
        res.json({message: 'order sent'})
    },

    delete: async (req,res) => {
        const id = req.params.id;
        await orderModule.deleteOrderById(id);
        res.json({ message : `Order with id: ${id} deleted`});
    },

    getOrdersPdf: async (req,res) => {
        const today = moment(new Date().toUTCString()).format('DD-MM-YY');
        let todayOrders = await orderModule.showAllOrders();
        todayOrders = todayOrders.filter(({delivery_date}) =>{
            return moment(new Date(delivery_date)).format('DD-MM-YY') === today;
        });
        const pdfDoc = new tablePdf.create(todayOrders);
        pdfDoc.pipe(res);
        pdfDoc.fontSize(30);
        pdfDoc.end();
    }
}