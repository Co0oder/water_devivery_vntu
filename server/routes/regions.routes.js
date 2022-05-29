const reviewsController = require('../controllers/regions.controller');
const validator = require('./validators/regions.validator');
const router = require('express').Router();
const authCheck = require('../middlewares/session.checker');

router.get('/', reviewsController.show);
router.post('/', validator, reviewsController.add);
router.put('/:id', validator, reviewsController.update);
router.delete('/:id', reviewsController.delete);

module.exports = router;