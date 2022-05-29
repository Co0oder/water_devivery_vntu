const { check} = require('express-validator');
module.exports = [
        check('title').isString().notEmpty(),
        check('description').isString().notEmpty(),
        check('image').notEmpty(),
        check('price').isNumeric.notEmpty(),

];