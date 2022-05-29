const { check, validationResult } = require('express-validator');
module.exports = [
    check('login').isString().notEmpty(),
    check('password').isString().notEmpty(),
]