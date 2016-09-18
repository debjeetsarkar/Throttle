var apnAgent = require('./apn')
var fcmAgent = require('./fcm')

function notificationHandler() {}

notificationHandler.prototype.handleRequest = function(request, cb) {

	console.log("Inside handlers", request)
	cb(null, 'true')

}

module.exports = notificationHandler