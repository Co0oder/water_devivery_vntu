const { check, validationResult } = require('express-validator');
module.exports = [
    check('name').isString().notEmpty(),
    check('address').isString().notEmpty(),
    check('phone').isMobilePhone('any'),
    check('region').isString()
]