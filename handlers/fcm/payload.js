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

function Message (options) {
		this.message = {}

		if(!options){
			this.message = setUpDefaults()  
			return 
	}else{
		var messageOpts = {} 
		if (options.type && !_.isUndefined(options.type)){
			switch(options.type){
				case 'data':
					messageOpts.data = options.data
				break;
				case 'notification':
					messageOpts.notification = options.notification
				break;
			}
		}
		 processPayloadOptions(messageOpts,function(err,result){
		 	if(err){
		 		console.log("Error while creating message payload", options)
		 		return
		 	}else{
		 		this.message = result
		 		return
		 	}
		 })
	}
}



Message.prototype.addData = function(data){
	if(_.has(this.message,'data'){
		this.message.data = data	
	}else{
			this.message["data"] = data
	}	
}

Message.prototype.addNotification = function(notification){
		if(_.has(this.message,'notification'){
		this.message.notification = notification	
	}else{
			this.message["notification"] = notification
	}	
}

function processPayloadOptions(mappedOpts , cb)  {

	async.eachOf(mappedOpts, function(val, key , callback){
		if(! key === 'data' && ! key === 'notification' ){
			if(messageOpts[key]){
				mappedOpts[messageOpts[key].argName] = val
				callback()
			}
		}
	},function(err){
		if(err){
		console.log("Error during mapping keys in payload for", mappedOpts)
		cb(err, null)
		}else{
			var validationObject = payloadValidation.isValidMessageOptions(mappedOpts)
			if(!validationObject.valid){
				cb(err,null)
			}else{
				cb(null, mappedOpts)	
			}
			
		}
	})
}

function setUpDefaults() => {
	var defaultPayload  = {
    "notification" : {
      "body" : "default payload!",
      "title" : "Sample Application",
      "icon" : "myicon"
    }
 }
 return defaultPayload
}

module.exports = Message