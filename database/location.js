/**
 * Location module
 * @module insertLocation, findLocation,removeLocation
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
var table = dbConfig.tables.location;

var insertLocation = function(locationToInsert, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.insert(locationToInsert, db, callback);
    });
};

var findLocation = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.find(ObjectId(id), db, callback);
    });
};

var findAllLocations = function(callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findAll(db, callback);
    });
};

var removeLocation = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
        DBmanager.remove(ObjectId(id), db, callback);
    });
};

exports.insertLocation = insertLocation;
exports.findLocation = findLocation;
exports.findAllLocations = findAllLocations;
exports.removeLocation = removeLocation;