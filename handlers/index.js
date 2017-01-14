var fcmAgent = require('./fcm')

function notificationHandler() {}

notificationHandler.prototype.handleRequest = function(paramObj, cb) {
    var payload = new fcmAgent.payload(paramObj)
    cb(null, 'true')

}

module.exports = notificationHandler
