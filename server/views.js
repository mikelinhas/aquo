/*
 * RENDER views.
 */

exports.faviconerror = function (req,res) {
    res.json("I dont know what to do");
};

exports.index = function(req, res) {
    res.render('index');
};


