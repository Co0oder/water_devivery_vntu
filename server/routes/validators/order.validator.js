const { oneOf, check} = require('express-validator');
const moment = require('moment')


module.exports = [
    check('name').isString().notEmpty(),
    check('address').isString().notEmpty(),
    oneOf([
        check('house_number',"Має бути строкою").isString(),
        check('flat_number',"Має бути цілим числлом").isInt(),
    ], check('house_number',"Має бути строкою").isString()),
    // check('volume').isString(),
    // check('amount').isInt(),
    check('phone').isMobilePhone('any'),
    check('delivery_date').custom(val =>{
        return !isNaN(moment(val,'DD-MM-YY'));
    }),
    check('delivery_time').isString(),
]