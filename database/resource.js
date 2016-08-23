/**
 * Resource module
 * @module insertResource,findResource, removeResource
 */
var DBmanager = require('../database/dataBaseManager.js');
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dbConfig = require('../config/dbconfig.json');

/**
 * URL representation on the API taken from dbconfig.json.
 * @type {string}
 */
var url = dbConfig.url;
/**
 * collection name in MongoDB
 * @type {string}
 */
var table = dbConfig.tables.resource;

var insertResource = function(resourceToInsert, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.insert(resourceToInsert, db, callback);
    });
};

var findResource = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.find(ObjectId(id), db, callback);
    });
};

var findAllResources = function(callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findAll(db, callback);
    });
};

var removeResource = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
        DBmanager.remove(ObjectId(id), db, callback);
    });
};

exports.insertResource = insertResource;
exports.findResource = findResource;
exports.findAllResources = findAllResources;
exports.removeResource = removeResource;