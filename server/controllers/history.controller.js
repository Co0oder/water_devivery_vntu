const customersModel = require('../models/customers.model');
const ordersModule = require('../models/orders.model');
const tablePdf = require('./predication-table')
const _ = require('lodash');

function countDays(firstDate,secondDate){
    const oneDay = 24 * 60 * 60 * 1000;
    return diffDays = Math.round(Math.abs((new Date(firstDate) -new Date(secondDate)) / oneDay));
}

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days);
    return copy;
}

function comparator(a,b){
    if(new Date(a.predicated_date) < new Date(b.predicated_date)){
        return -1;
    }
    else{
        return 1;
    }
}

function filterCondition(prediction){
    return prediction.predicated_date.toLocaleDateString() >= new Date().toLocaleDateString();
}


async function getUserStatistic(){
    const counted_orders = 3;
        const data = await ordersModule.showAllForStatistic();
        let statistics = _.filter(_.groupBy(data,'phone'),(user_orders) =>  user_orders.length >= counted_orders);   
        statistics = statistics.map(stat => stat.sort((a,b) => {return new Date(b.delivery_date) - new Date(a.delivery_date)}))    
        
        const predicated = statistics.map(stat => {
            let avg = 0;
            for(let i = 1; i < counted_orders; i++){
                avg += countDays(stat[i].delivery_date,stat[i-1].delivery_date);
            }
            const days = Math.floor(avg/(stat.length-1));
            const predicated_date = addDays(new Date(stat[0].delivery_date), days);
            const phone = stat[0].phone;
            return {
                phone,
                predicated_date
            }
        }).sort(comparator);
        
        const concatData = predicated.map(async prediction => {
            const user = await customersModel.getCustomerByPhone(prediction.phone);
            return {...prediction, ...user[0] }
        })
        const resultStatistic = await Promise.all(concatData);
        return resultStatistic
}

module.exports = {
    getUserStatisticJSON: async (req,res) => {
        const resultStatistic = await getUserStatistic();
        res.send(resultStatistic);
    },
    getUserStatisticPDF: async (req,res) => {
        const resultStatistic = await getUserStatistic();
        const pdfDoc = new tablePdf.create(resultStatistic);
        pdfDoc.pipe(res);
        pdfDoc.fontSize(30);
        pdfDoc.end();
    }
}