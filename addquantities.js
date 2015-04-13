// vamos a hacer un programa en el que se le 
// añada una cantidad aleatoria a todos los artículos

var express = require('express');
var fs = require('fs');
var app = express(); // Web framework to handle routing requests
var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB
var MONGOHQ_URL="mongodb://mike:1234@dogen.mongohq.com:10023/app31033205";
//var MONGOHQ_URL= 'mongodb://localhost:27017/aquodb';

MongoClient.connect(MONGOHQ_URL, function(err, db) {
    "use strict";
    if(err) throw err;

    var stock = db.collection("stock");
    var articles = db.collection("articles");
    var people = ["Mike","Bert","Anni","Natasha","Elvis Presley"];
    var types = ["Entry","Exit","Adjustment","Production"];
    var plusminus = [1,-1];

    getallCodes( function (err,codes){
      for (var i = codes.length - 1; i >= 0; i--) {
        console.log("Updated Code:  " + codes[i].Code);
        var query = {Code:codes[i].Code};
        var quantity = Math.floor((Math.random()*1000)+1001);
        updateDocument(query,quantity);
      };
      console.log(" ");
      console.log("I'm finished, going off to bed!!");
      process.exit();
    });

    function getallCodes(callback) {
      articles.find({},{_id:0,"Code":1}).toArray( function (err,codes){
        if (err) throw err;
        return callback(null,codes);
      });

    };

    function updateDocument (query,quantity){
      console.log(quantity);
      console.log(query);
      articles.update(query,{$set:{"Quantity":quantity}}, function (err,res){
          if(err) throw err;
          console.log(res);
      });
    };

});
