const { check } = require('express-validator');
module.exports = [
    check('id').isNumeric(),
    check('name').isString().notEmpty(),
    check('address').isString().notEmpty(),
    check('phone').isMobilePhone('any'),
    check('region').isString()
]