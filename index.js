const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const userApi = require('./api/users-api');

var app = express();
app.use( session({
	secret: 's3cr3t',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 30000
	}
}) );
app.use( express.static('public-www') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
	extended: true
}) );
app.use( userApi );

app.listen(process.env.PORT, function() {
	console.log("Server started at port: " + process.env.PORT);
});
