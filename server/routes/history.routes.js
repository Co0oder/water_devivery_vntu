const historyController = require('../controllers/history.controller');
const router = require('express').Router();

router.get('/', historyController.getUserStatisticJSON);
router.get('/pdf', historyController.getUserStatisticPDF);


module.exports = router;