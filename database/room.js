/**
 * Room module
 * @module findRoom
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
var table = dbConfig.tables.room;

/**
 * Find a specific room by ID in the database
 * @param {Object} id - Room Id
 * @param {function} callback - function for handle the object found
 */
var findRoom = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.find(ObjectId(id), db, callback);
    });
};

/**
 * Return all rooms
 * @param {function} callback - function for handle the array
 */
var findAllRooms = function(callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findAll(db, callback);
    });
};

/**
 * Return all rooms pertaining to a service
 * @param {Object} id - Service Id
 * @param {function} callback- function for handle the array
 */
var findAllRoomsOfOneService = function(serviceId, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findByParameters({"serviceId":ObjectId(serviceId)}, db, callback);
    });
};

/**
 * Add a resource to a room
 * @param {string} id - Room Id
 * @param {Object} resourceToInsert - Resource data in JSON structure
 * @param {function} callback - function for handle the object modified
 */
var addResourceToRoom = function(id,resourceToInsert, callback){
        var jsonResource=
        { $push: {
            resources: {
            "quantity": parseInt(resourceToInsert.quantity),
            "resourceId": resourceToInsert._id.toString(),
            "_id": ObjectId(resourceToInsert._id.toString())
            }
        } };

        mongoClient.connect(url, function(err, db) {
            DBmanager.setTable(table);
            DBmanager.update(ObjectId(id),
                jsonResource,
                db, callback);
        });
};
/**
 * Delete a specific resource by id from a room
 * @param {string} id - Room Id
 * @param {string} resourceId - Resource Id
 * @param {function} callback - function for handle the object modified
 */
var removeResourceToRoom = function(id,resourceId, callback){
    var jsonResource=
    {  "$pull":     {
        "resources": {
            "resourceId": resourceId.toString()

        }
    } };

    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.update(id,
            jsonResource,
            db, callback);
    });

};
exports.findRoom = findRoom;
exports.findAllRooms = findAllRooms;
exports.findAllRoomsOfOneService = findAllRoomsOfOneService;
exports.addResourceToRoom = addResourceToRoom;
exports.removeResourceToRoom = removeResourceToRoom;

