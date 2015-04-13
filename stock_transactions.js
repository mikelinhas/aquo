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
      for (var i = 1000000; i >= 0; i--) {
        console.log("Sent num " + i);
        createDoc(codes);
      };
    });

    function createDoc(codes){

      var num = codes.length;
      var type = types[Math.floor((Math.random()*4))];
      var quantity = Math.floor((Math.random()*1000)+1);
      if (type == "Exit") {
        quantity = quantity*(-1);
      };
      if (type == "Adjustment") {
        quantity = quantity*(-1)
        //quantity = quantity*plusminus[Math.floor((Math.random()))];
      };
      var code = codes[Math.floor((Math.random()*num))].Code;
      var person = people[Math.floor((Math.random()*5))];
      var date = getRandomDate();


      var doc = {
        "Code":code,
        "Type":type,
        "Qty":quantity,
        "Date":date,
        "Responsible":person
      };

      insertDocument (doc);

    };


    function getallCodes(callback) {
      articles.find({},{_id:0,"Code":1}).toArray( function (err,codes){
        if (err) throw err;
        return callback(null,codes);
      });

    };

    function getRandomDate() {
      var month = Math.floor((Math.random()*12)+1);
      var day = Math.floor((Math.random()*28)+1);
      var hour = Math.floor((Math.random()*12)+8);
      var minute = Math.floor((Math.random()*60)+1);
      var randomdate = new Date(2014,month,day,hour,minute); 
      return randomdate;     
    };


    function insertDocument (doc){

       stock.insert(doc,
         function (err,res){
           if(err) throw err;
      });
    };
 
});
