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
var table = dbConfig.tables.attendees;

/**
 * Return all attendees by service id
 * @param {String} id - Service Id
 * @param {String} filter - filter by account name (e.g. rodrigo)
 * @param {function} callback - function for handle the array
 */
var findAttendeesByService = function(id,filter,callback){
    filter = new RegExp(filter,'i');
    filterJSON = {
        "name": { $regex: filter },
        "serviceId" : ObjectId(id)
    };
    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.findByParameters(filterJSON,db, callback);
    });
};
exports.findAttendeesByService = findAttendeesByService;