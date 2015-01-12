var mongodb = require('./mongo')

exports.deleteall = function (req, res) {
	console.log("step1");
	mongodb.deleteall ("articles", function (err,result) {
		if (err) {
			console.log(err);
			res.status(500).send({});
		} else {
			console.log("articles collection is empty");
			mongodb.deleteall ("stock", function (err,result) {
				if (err) {
					console.log(err);
					res.status(500).send({});
				} else {
					console.log("Stock collection is empty");
					res.status(200).send({});
				}
			})
		}
	})

}