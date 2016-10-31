var fcmAgent = require('./fcm')

function notificationHandler() {}

notificationHandler.prototype.handleRequest = function(paramObj, cb) {

    //console.log("Inside handlers", paramObj)

    var payload = new fcmAgent.payload(paramObj)
    console.log("PAYLOAD GENERATED IS", payload)
    cb(null, 'true')

}

module.exports = notificationHandler
