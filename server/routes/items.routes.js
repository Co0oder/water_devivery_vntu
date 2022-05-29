const itemController = require('../controllers/item.controller');
const multer  = require("multer");
const authCheck = require('../middlewares/session.checker');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

const upload = multer({
    dest:"uploads", 
    storage: storage,
    limits:{
        fileSize: 1024 * 1024
    }});
const router = require('express').Router();

router.post('/:id', authCheck, upload.single('image'), itemController.createItem);
router.post('/', authCheck, upload.single('image'), itemController.createItem);
router.get('/', itemController.showItems);
router.delete('/:id' , authCheck, itemController.deleteItems);
module.exports = router;