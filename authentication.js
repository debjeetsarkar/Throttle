var authentication = {}
var mongoConnection = require('./db/connection')
var mongo = new mongoConnection()

authentication.authenticate = function(obj, done) {
    mongo.find({ "accessToken": obj.accessToken }, findCallback)

    function findCallback(err, result) {
        if (err) {
            done(err, null)
        } else if (result && result.status == 200) {
            if (result.user.username === obj.username) {
                done(null, result.user)
            } else {
                done({
                    status: 400,
                    type: 'Not authorised'
                }, null)
            }
        }
    }
}

module.exports = authentication
