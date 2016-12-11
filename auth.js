var authentication = {}
var notifObject = require('./notification-object')
var Validator = require('jsonschema').Validator
var v = new Validator()
 


authentication.authenticate = function(req, res, next) {
	console.log('auth debug log', v.validate(req.body, notifObject).valid, req.body)
	if (v.validate(req.body, notifObject).valid) {
		next()
	} else {
		res.statusCode = 404
		res.end()
	}
}

module.exports = authentication