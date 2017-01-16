var fcmAgent = require('./fcm')
var request = require('request')
var randomstring = require("randomstring")
var mongo = new require('../db/connection')()

function notificationHandler() {}

notificationHandler.prototype.send = function(paramObj, cb) {
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
            if (res.statusCode === 401) {
                cb({
                    status: '401',
                    message: 'Invalid server api key'
                }, null)
            } else if (res.statusCode === 200) {
                createClientHash(paramObj, cb)
            }

        }
    })
}



function createClientHash(obj, cb) {
    obj.accessToken = obj.key + getRandomString()
    insertUserDetails(obj, cb)
}

function insertUserDetails(obj, callback) {
    mongo.insert({
        "username": obj.username,
        "key": obj.key,
        "accessToken": obj.accessToken
    }, insertCb)

    function insertCb(err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    }
}

function getRandomString() {
    var randomStr = randomstring.generate({
        length: 8,
        charset: 'alphabetic'
    })
    return randomStr
}

function verifyServerApiKey(key, callback) {
    request({
        headers: {
            "Authorization": "key=" + key,
            "Content-Type": "application/json",
        },
        uri: 'https://fcm.googleapis.com/fcm/send',
        body: '{\"registration_ids\":[\"ABC\"]}',
        method: 'POST'
    }, function(err, res, body) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res)
        }
    })
}

module.exports = notificationHandler
