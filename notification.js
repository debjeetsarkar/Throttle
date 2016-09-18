var handler = require('./handlers')
var notificationHandler = new handler()

var notification = {}

notification.sendNotification = (request, response) => {

	console.log("Inside notification controller", request.body)
	var notificationContent = request.body.content
	var notificationReceiver = request.body.receiver

	notificationHandler.handleRequest({
		content: notificationContent,
		receiver: notificationReceiver
	}, function(_err, _res) {
		if (_err) {
			response.send(_err)
		} else {
			response.send(_res)
		}

	})

}

module.exports = notification