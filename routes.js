var express = require('express')

var router = express.Router()

var notificationController = require('./notification')

router.route('/send').post(notificationController.sendNotification)

module.exports = router
