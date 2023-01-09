const express = require('express')
const router = express.Router()
const leaveCtrl = require('../controllers/leaveController')

router.post('/add', leaveCtrl.add)

module.exports = router