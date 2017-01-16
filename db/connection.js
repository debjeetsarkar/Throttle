var mongoClient = require('mongodb').MongoClient
var options = {
    url: 'mongodb://localhost:27017/User'
}
var mongoConnection = undefined

function db() {
    this.options = options
    getMongoConnection()
}

function getMongoConnection() {
    if (mongoConnection) {
        return
    } else {
        mongoClient.connect(options.url, mongoConnectCallback)

        function mongoConnectCallback(err, db) {
            if (err) {
                console.log("Error to connect mongo", err)
                return
            }
            console.log("Connected to Mongodb")
            mongoConnection = db
        }
    }
}

db.prototype.insert = function(obj, callback) {
    mongoConnection.collection('Users').insertOne({
        "username": obj.username,
        "key": obj.key,
        "accessToken": obj.accessToken
    }, function insertCallback(err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

db.prototype.find = function(obj, callback) {
    mongoConnection.collection('Users').findOne(obj, getUserCb)

    function getUserCb(err, user) {
        if (err) {
            callback({
                type: 'database',
                status: 500
            }, null)
        }
        if (user != null) {
            callback(null, {
                status: 200,
                user: user
            })
        } else {
            callback({
                type: 'client',
                status: 400
            }, null);
        }
    }
}

db.prototype.closeConnection = function() {
    if (mongoConnection) {
        mongoConnection.close()
    }
}

module.exports = db
