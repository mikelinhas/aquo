/**
 * Module dependencies
 */

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var ejslocals = require('ejs-locals');
var mongo = require('mongodb');

//Routing files
var mongodb = require('./server/mongo');
var views = require('./server/views');
var articles = require('./server/articles');
var resources = require('./server/resources');

//Middleware (used to be bundled with Express 3.0)
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

//Express
var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'client')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(errorHandler());
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
app.get('/', views.login);
app.get('/home', views.home);
app.get('/login', views.login);
app.get('/sandbox', views.sandbox);
app.get('/inventory', views.inventory);
app.get('/production', views.production);
app.get('/settings', views.settings);

// Load / Update / Delete stuff with mongo
app.get('/rest/articles', articles.getarticles);
app.get('/rest/article_id', articles.getOnearticle);
app.get('/rest/resources', resources.getresources);


// Posts
app.post('/rest/articles/add', articles.addarticle);

// Delete
app.delete('/rest/articles/delete', articles.delete);
app.delete('/rest/articles/deleteall', articles.deleteall);

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
		app.listen(app.get('port'), function() {
		    console.log('Express server listening on port ' + app.get('port'));
		});
	}
});

		