var mongo  = require("mongodb");
//var log    = require("./utilities").log;
var n      = "[ mongo.js] ";
var Server = mongo.Server;
var Db     = mongo.Db;
var BSON   = mongo.BSONPure;
var MongoClient = mongo.MongoClient;
var MONGOHQ_URL="mongodb://mike:1234@kahana.mongohq.com:10029/app28981693";
var db;

// Init
    exports.init = function(cb){
            //db.open(cb);
            console.log("connecting to MongoDB...");
            MongoClient.connect(MONGOHQ_URL, {
                server: {
                    auto_reconnect: true,
                    socketOptions: {
                        connectTimeoutMS: 3000,
                        socketTimeoutMS:  3000,
                        keepAlive:        3000
                    }
                }
            }, function(err, dbinstance) {
                    if (err){
                        //log(err);
                        cb(err,0);
                    } else {
                        db = dbinstance;
                        cb(0,dbinstance);
                    }
            });
    };


// Pass collection to model for a custom operation
    exports.getCollection = function(collectionName, cb){
        db.collection(collectionName, cb);
    };

// Generic
    exports.findAll = function(collectionName, cb){
        db.collection(collectionName, function(err, collection) {
            collection.find({},{}).toArray(cb);
        });
    };
    exports.findAllfiltered = function(query, cb){
        db.collection(collectionName, function(err, collection) {
            collection.find({},{}).toArray(cb);
        });
    };
    exports.findById = function(collectionName, id, cb){
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id)}, cb );
        });
    };
    exports.create = function(collectionName, data, cb){  //same as insert
            data.updatedAt = new Date();
            data.createdAt = data.updatedAt;
            db.collection(collectionName, function(err, collection) {
                collection.insert(data, {safe:true}, cb);
            });
    };
    exports.update = function(collectionName, id, data, cb){  //same as insert
            if (data._id)
                delete data._id;
            data.updatedAt = new Date();
            db.collection(collectionName, function(err, collection) {
                collection.update({'_id':new BSON.ObjectID(id)}, data, {safe:true, upsert:false}, cb);
            });
    };
    exports.delete = function(collectionName, id, cb){
        db.collection(collectionName, function(err, collection) {
            collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, cb);
        });
    };

// Site
    exports.siteFindAll = function(collectionName, site, cb){
        site = site || "";
            if (site == ""){
                cb("No site specified",0);
                return;
            }
        db.collection(collectionName, function(err, collection) {
            collection.find({'site':site}).toArray(cb);
        });
    };
    exports.siteFindById = function(collectionName, site, id, cb){
        site = site || "";
            if (site == ""){
                cb("No site specified",0);
                return;
            }
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id), 'site':site}, cb );
        });
    };
    exports.siteFindByUid = function(collectionName, site, uid, cb){
        site = site || "";
            if (site == ""){
                cb("No site specified",0);
                return;
            }
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'UID': uid, 'site': site}, cb );
        });
    };
    exports.siteCreate = function(collectionName, site, data, cb){  //same as insert
            site = site || "";
            if (site == ""){
                cb("No site specified",0);
                return;
            }
            data.updatedAt = new Date();
            data.createdAt = data.updatedAt;
            data.site = site;
            db.collection(collectionName, function(err, collection) {
                collection.insert(data, {safe:true}, cb);
            });
    };
    exports.siteUpdate = function(collectionName, site, id, data, cb){  //same as insert
            site = site || "";
            if (site == ""){
                cb("No site specified",0);
                return;
            }
            if (data._id)
                delete data._id;
            data.updatedAt = new Date();
            data.site = site;
            db.collection(collectionName, function(err, collection) {
                collection.update({'_id':new BSON.ObjectID(id), 'site':site}, data, {safe:true, upsert:false}, cb);
            });
    };

    exports.siteUpdateByUid = function(collectionName, site, uid, data, cb){  //same as insert
            site = site || "";
            if (site == ""){
                cb("No site specified",0);
                return;
            }
            if (data._id)
                delete data._id;
            data.updatedAt = new Date();
            data.site = site;
            db.collection(collectionName, function(err, collection) {
                collection.update({'UID':uid, 'site':site}, data, {safe:true, upsert:false}, cb);
            });
    };

    exports.siteDelete = function(collectionName, site, id, cb){
        site = site || "";
        if (site == ""){
            cb("No site specified",0);
            return;
        }
        db.collection(collectionName, function(err, collection) {
            collection.remove({'_id':new BSON.ObjectID(id), 'site':site}, {safe:true}, cb);
        });
    };


