const callsController = require('../controllers/calls.controller');
const validator = require('./validators/calls.validator');
const router = require('express').Router();

router.get('/', callsController.show);
router.post('/', validator, callsController.add);
router.delete('/:id', validator, callsController.delete);

module.exports = router;