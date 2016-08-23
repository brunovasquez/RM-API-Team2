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
var table = dbConfig.tables.service;

/**
 * Return all services
 * @param {Object} id - Service Id
 * @param {function} callback - function for handle the object
 */
var findService = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.find(ObjectId(id), db, callback);
    });
};

/**
 * Return all services
 * @param {function} callback - function for handle the array
 */
var findAllServices = function(callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findAll(db, callback);
    });
};

exports.findService = findService;
exports.findAllServices = findAllServices;