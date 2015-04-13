/*
 * RENDER views.
 */

exports.faviconerror = function (req,res) {
    res.json("I dont know what to do");
};

exports.home = function(req, res) {
    res.render('main_views/home');
};

exports.login = function(req, res) {
    res.render('main_views/login');
};

exports.sandbox = function(req, res) {
    res.render('modules/sandbox/index');
};

// --------- INVENTORY MODULE ----------------

exports.inventory = function(req, res) {
    res.redirect('/inventory/dashboard');
};

exports.inventory_dashboard = function(req, res) {
    res.render('modules/inventory/dashboard/index');
};

exports.inventory_stock = function(req, res) {
    res.render('modules/inventory/stock/index');
};

exports.inventory_database = function(req, res) {
    res.render('modules/inventory/database/index');
};



// ---------- PRODUCTION MODULE -------------------

exports.production = function(req, res) {
    res.render('modules/production/index');
};

// ---------- SETTINGS MODULE ---------------------

exports.settings = function(req, res) {
    res.render('modules/settings/index');
};


