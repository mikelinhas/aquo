var mongodb = require('./mongo')

// GET

	exports.getwarehouses = function (req,res) {
		var collectionName = "warehouses";
        console.log(req.query);
		mongodb.findAll(collectionName, function (err,result) {
			if (err){
				console.log(err);
				res.status(500).send({});
			} else {
				res.status(200).send(result);
			}
		});
	}

    exports.getOnewarehouse = function (req,res) {
        var collectionName = "warehouses";
        var id = req.query.id;
        console.log(id);
        mongodb.findById(collectionName, id, function (err,result) {
            if (err){
                console.log(err);
                res.status(500).send({});
            } else {
                res.status(200).send(result);
            }
        });
    }

// POST

exports.addwarehouse = function(req, res) {
    var date = new Date();
    console.log (date);
    var article = [{
        Code: req.body.Code,
        Warehouse: {name : req.body.Warehouse, quantity: req.body.Quantity},
        Article_id: req.body.Article_id,
        Last_modified: date
    }];

    console.log(article);
    mongodb.create('warehouse', article, function (err, result) {
    	if (err) {
    		console.log (err);
    		res.status(500).send({});
    	} else {
    		console.log ("warehouse was added to mongodb.. check it out");
    		res.status(200).send({});
    	}
    });

};


// DELETE

exports.delete = function (req, res) {
	console.log (req.body);
	var id = req.body.id;
	mongodb.delete ("articles", id, function (err,result) {
		if (err){
			console.log(err);
    		res.status(500).send({});
		} else {
			console.log(id + "was deleted from the mongoDB");
    		res.status(200).send({});
		}
	});
};
var mongodb = require('./mongo')


/*  

[0:07:35] Marios Georgiou: your middleware.js should look like

exports.findAll = function(req,res){
    log(n+"Returning all");
    model.siteFindAll('Rules', req.user.linkedDevices, function(err, result){
        if (err){
            log(err);
            res.send(500, {});
        } else {
            res.send(200, result);
        }
    });
    //res.end();
};

*/