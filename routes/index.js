//Routing files
var views = require('./views');
var articles = require('../database/articles');
var stock = require('../database/stock');
var resources = require('../database/resources');
var general = require('../database/general');


module.exports = exports = function(app, db) {

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
	app.get('/rest/stock', stock.getstock);
	app.get('/rest/article_id', articles.getOnearticle);
	app.get('/rest/resources', resources.getresources);


	// Posts
	app.post('/rest/articles/add', articles.addarticle);

	// Delete
	app.delete('/rest/articles/delete', articles.delete);
	app.delete('/rest/database/deleteall', general.deleteall);

	// redirect all others to the index
	app.get('*', views.home); //no funciona
}