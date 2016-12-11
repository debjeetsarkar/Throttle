var express = require('express')

var router = express.Router()

var notificationController = require('./notification')

router.route('/send').post(notificationController.sendNotification)
router.route('/register').post(notificationController.register)

module.exports = router