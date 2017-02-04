var request = require('request')

function transmitter(options) {

}


transmitter.prototype.transmit = function(obj,cb) {

    var requestObject = generateFcmRequest(obj)

    request(requestObject, requestCallback)

    function requestCallback(err, res) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, res)
        }
    }

}

var generateFcmRequest = function(obj) {
    console.log("===transmit===",obj.key)
    return {
        headers: {
            "Authorization": "key=" + obj.key,
            "Content-Type": "application/json",
        },
        uri: 'https://fcm.googleapis.com/fcm/send',
        json: obj.payload.message,
        method: 'POST'
    }
}

module.exports = transmitter