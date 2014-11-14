/**
 * Module dependencies
 */

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var ejslocals = require('ejs-locals');
var mongo = require('mongodb');

//Routing files
var mongodb = require('./server/mongo');
var views = require('./server/views');
var articles = require('./server/articles');
var resources = require('./server/resources');

//Express
var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(express.errorHandler());
}

// production only
if (env === 'production') {
    // TODO
}

/**
 * Routes
 */

//To get rid of the favicon.ico error
app.get('/favicon.ico', views.faviconerror);


// Render the different views for the different apps
app.get('/', views.home);



// Posts
app.post('/rest/articles/add', articles.addarticle);

// Delete
app.delete('/rest/articles/delete', articles.deletearticle);

// redirect all others to the index
app.get('*', views.home); //no funciona


/** 
 * Connect to Database and Start Server
 */

mongodb.init(function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to MongoDB! Yay!")
		http.createServer(app).listen(app.get('port'), function() {
		    console.log('Express server listening on port ' + app.get('port'));
		});
	}
});

		