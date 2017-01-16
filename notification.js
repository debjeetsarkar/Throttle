var handler = require('./handlers')
var notificationHandler = new handler()
var authentication = require('./authentication')

var notification = {}

notification.sendNotification = (request, response) => {
    authentication.authenticate(request.body, authCb)

    function authCb(err, res) {
        if (err) {
            response.send({
                status: err.status,
                message: 'authentication failure'
            })
            return
        }

        notificationHandler.send(request.body, function(_err, _res) {
            if (_err) {
                response.send(_err)
            } else {
                response.send(_res)
            }
        })
    }

}

notification.register = (request, response) => {
    notificationHandler.registerClient(request.body, function(_err, _res) {
        if (_err) {
            response.send(_err)
        } else {
            response.send(_res)
        }
    })
}



module.exports = notification
