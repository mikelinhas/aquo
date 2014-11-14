var mongodb = require('./mongo')

// GET
	
	// Note: this route filters the query to just the important stuff
	exports.getfilteredarticles = function(req, res) {
		var collectionName = "articles";
		console.log('now in the articles.js file and willing to route over to mongo from marios with some variables: ' + collectionName);
		mongodb.findAll(collectionName, function (err,result) {
	    //    if (err) res.render('Did not find contact');
	    //    else {
	    //        console.log('We found this' + cb)
	    //        //res.json(cb);
	    //        res.end();
	    //    };

		});
	};

	exports.getarticles = function (req,res) {
		var collectionName = "articles";
		mongodb.findAll(collectionName, function (err,result) {
			if (err){
				console.log(err);
				res.send(500, {});
			} else {
				res.send(200, result);
			}
		});
	}

	exports.getOnearticle = function (req,res) {
		var collectionName = "articles";
		var id = req.query.id;
		console.log(id);
		mongodb.findById(collectionName, id, function (err,result) {
			if (err){
				console.log(err);
				res.send(500, {});
			} else {
				res.send(200, result);
			}
		});
	}


// POST

exports.addarticle = function(req, res) {
    var date = new Date();
    console.log (date);
    var article = [{
        Code: req.body.Code,
        Description: req.body.Description,
        Category: req.body.Category,
        Subcategory: req.body.Subcategory,
        Last_modified: date
    }];

    console.log(article);
    mongodb.create('articles', article, function (err, result) {
    	if (err) {
    		console.log (err);
    		res.send(500, {});
    	} else {
    		console.log ("article was added to mongodb.. check it out");
    		res.send(200, {});
    	}
    });

};


// DELETE

exports.deletearticle = function (req, res) {
	console.log (req.body);
	var id = req.body.id;
	mongodb.delete ("articles", id, function (err,result) {
		if (err){
			console.log(err);
			res.send(500, {});
		} else {
			console.log(id + "was deleted from the mongoDB");
			res.send(200, {});
		}
	});
};

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