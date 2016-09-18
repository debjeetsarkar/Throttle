var authentication = {}

authentication.authenticate = function(req, res, next) {
	console.log("Authentication module", req.body)
	next()
}

module.exports = authentication