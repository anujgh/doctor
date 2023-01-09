var express = require('express')
var router = express.Router()
var ctrl = require('../controllers/doctorController')

router.post('/add', ctrl.add)
router.get('/doctorsByDay',ctrl.doctorsByDay)
router.get('/doctorsByDate', ctrl.doctorsByDate)

module.exports = router