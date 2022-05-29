const { check } = require('express-validator');
module.exports = [
        check('name').isString().notEmpty(),
        check('review').isString().notEmpty()
]