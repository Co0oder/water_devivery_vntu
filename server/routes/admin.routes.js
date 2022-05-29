const adminController = require('../controllers/admin.controller');
const validator = require('./validators/admin.validator');
const router = require('express').Router();

router.get('/', adminController.getUser);
router.post('/login', validator, adminController.login);
router.get('/logout', adminController.logout);

module.exports = router;