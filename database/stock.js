/* This .js middleware will help to query, insert, delete, update
   stuff in the "stock" collection 
*/

function stockData (db){
    "use strict";

    var stock = db.collection("stock");


    // GET

    this.getstock = function (req,res) {
        stock.find({}).sort({"Date":-1}).limit(20).toArray( function (err,result) {
            if (err){
                console.log(err);
                res.status(500).send({});
            } else {
                res.status(200).send(result);
            }
        });
    }

    this.querystock = function (req,res) {
        var code = req.query.code;
        var from = new Date(req.query.from);
        var until = new Date(req.query.until);
        console.log(from);
        console.log(until);
        stock.find({"Code":code,
                    $and:[
                        {"Date":{$gte:from}},
                        {"Date":{$lte:until}}]})
             .sort({"Date":-1}).limit(20)
             .toArray( function (err,result) {
                if (err){
                    console.log(err);
                    res.status(500).send({});
                } else {
                    res.status(200).send(result);
                }
        });
    }


    // POST

    this.addstock = function(req, res) {
        var date = new Date();
        console.log (date);
        var article = [{
            Code: req.body.Code,
            Warehouse: {name : req.body.Warehouse, quantity: req.body.Quantity},
            Article_id: req.body.Article_id,
            Last_modified: date
        }];

        console.log(article);
        mongodb.create('stock', article, function (err, result) {
            if (err) {
                console.log (err);
                res.status(500).send({});
            } else {
                console.log ("stock was added to mongodb.. check it out");
                res.status(200).send({});
            }
        });

    };


    // DELETE

    this.delete = function (req, res) {
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

}

module.exports.stockData = stockData;