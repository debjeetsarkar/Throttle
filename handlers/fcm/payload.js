/**

This module is responsible for creating the payload to be sent to fcm. 
It can accept :
		
			1. Data messages.
			2. Notification Messages.
			3. Combination of above two types.

Returns a message object which is later consumed by the transmitter to transmit the payload to the fcm server. 

**/

var _ = require('lodash')
var messageOptionConstants = require('../utils/message-options')

function Message(options) {
    this.message = {}

    if (!options || _.isEmpty(options)) {
        this.message = setUpDefaults()
        return
    } else {

        var messageOpts = {}
        if (options.type && !_.isUndefined(options.type)) {
            switch (options.type) {
                case 'data':
                    if (_.isUndefined(options.data)) {
                        return
                    }
                    messageOpts.data = options.data
                    break;
                case 'notification':
                    if (_.isUndefined(options.notification)) {
                        return
                    }
                    messageOpts.notification = options.notification
                    break;
            }
            delete options.type
            this.message = processPayloadOptions(options, messageOpts)
        } else {
            this.message = processPayloadOptions(options)
        }
    }
}

Message.prototype.addData = function(data) {
    if (_.has(this.message, 'data')) {
        this.message.data = data
    } else {
        this.message["data"] = data
    }
}

Message.prototype.addNotification = function(notification) {
    if (_.has(this.message, 'notification')) {
        this.message.notification = notification
    } else {
        this.message["notification"] = notification
    }
}

function processPayloadOptions(mappedOpts, messageType) {
    Object.keys(mappedOpts).forEach(function(_key) {
        if (!_key === 'data' && !_key === 'notification') {
            if (messageOptionConstants[_key]) {
                mappedOpts[messageOptionConstants[_key].argName] = mappedOpts[_key]
            }
        }
    })

    if (messageType) {
        Object.keys(messageType).forEach(function(_key) {
            mappedOpts[_key] = messageType[_key]
        })
    }

    return mappedOpts
}

function setUpDefaults() {
    var defaultPayload = {
        "notification": {
            "body": "default payload!",
            "title": "Sample Application",
            "icon": "myicon"
        }
    }
    return defaultPayload
}

module.exports = Message
