// vamos a hacer un programa en el que se le 
// añada una cantidad aleatoria a todos los artículos

var express = require('express');
var fs = require('fs');
var app = express(); // Web framework to handle routing requests
var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB

MongoClient.connect('mongodb://localhost:27017/aquodb', function(err, db) {
    "use strict";
    if(err) throw err;

    var stock = db.collection("stock");
    var articles = db.collection("articles");

    datefinder();

    function datefinder(callback) {
      var date = new Date();
      console.log(date);
      stock.find({"Code":"PON-LIQ01",
                  $and:[
                    {"Date":{$lte:date}},
                    {"Date":{$lte:date}}]})
           .sort({"Date":-1}).limit(1)
           .toArray( function (err,result) {
              if (err){
                  console.log(err);
                  process.exit();

              } else {
                  console.log(result);
                  process.exit();
              }
        });
    };

    
});
