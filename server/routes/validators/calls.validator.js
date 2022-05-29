const { check, validationResult } = require('express-validator');
module.exports = [
    check('name').isString().notEmpty(),
    check('phone').isMobilePhone('any'),
]