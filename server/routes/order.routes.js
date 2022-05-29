const orderController = require('../controllers/orders.controller');
const validator = require('./validators/order.validator');
const router = require('express').Router();
const authCheck = require('../middlewares/session.checker');

router.get('/', authCheck, orderController.show);
router.get('/pdf', authCheck ,orderController.getOrdersPdf);
router.post('/', validator, orderController.add);
router.delete('/:id', authCheck, orderController.delete);

module.exports = router;