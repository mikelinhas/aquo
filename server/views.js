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

exports.inventory = function(req, res) {
    res.render('modules/inventory/index');
};

exports.production = function(req, res) {
    res.render('modules/production/index');
};



