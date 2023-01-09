const express = require('express')
const router = express.Router();
const bookingCtrl = require('../controllers/bookingController');

router.get('/list', bookingCtrl.list);
router.post('/add',bookingCtrl.add)

module.exports = router