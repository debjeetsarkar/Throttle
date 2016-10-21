var express = require('express')
var app = express()
var routes = require('./routes')
var authentication = require('./auth')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use('/', authentication.authenticate, routes)


app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});