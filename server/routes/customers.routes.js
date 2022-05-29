const customersController = require('../controllers/customers.controller');
const update_validator = require('./validators/updateCustomers.validator');
const create_validator = require('./validators/customers.validator');
const authCheck = require('../middlewares/session.checker');
const router = require('express').Router();

router.get('/', authCheck, customersController.show);
router.post('/', authCheck, create_validator, customersController.add);
router.put('/', authCheck, update_validator, customersController.update);
router.delete('/:id', update_validator, customersController.delete);

module.exports = router;