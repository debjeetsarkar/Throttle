var fcmAgent = require('./fcm')
var request = require('request')

function notificationHandler() {}

notificationHandler.prototype.handleRequest = function(paramObj, cb) {
    var payload = new fcmAgent.payload(paramObj)
    cb(null, 'true')

}

notificationHandler.prototype.registerClient = function(paramObj, cb) {
    var serverApiKey = paramObj.key
    verifyServerApiKey(serverApiKey, function(err, res) {
        if (err) {
            console.log("Error during server api key validation", err)
            cb(err, null)
        } else {
            console.log("Response from fcm after server api key validation", res.statusCode)
            if (res.statusCode === '401') {
                cb({
                    status: '401',
                    message: 'Invalid server api key'
                }, null)
            } else {
                createClientHash(serverApiKey, cb)
            }

        }
    })
}



function createClientHash(key, cb) {
    //create a hash of the server api key and the user credentials in redis and return the hash.

}

function verifyServerApiKey(key, callback) {
    request({
        headers: {
            "Authorization": "key=" + key,
            "Content-Type": "application/json",
        },
        uri: ' https://gcm-http.googleapis.com/gcm/send',
        body: '{\"registration_ids\":[\"ABC\"]}',
        method: 'POST'
    }, function(err, res, body) {
        console.log(err, res, body)
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

module.exports = notificationHandler
