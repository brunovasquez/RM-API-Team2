/**
 * Meeting module
 * @module insertMeeting, findMeeting,removeMeeting
 */
var DBmanager = require('../database/dataBaseManager.js');
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var ISODate = require('mongodb').ISODate;
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
var table = dbConfig.tables.meeting;

var findMeeting = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.find(ObjectId(id), db, callback);
    });
};

var findAllMeetings = function(callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findAll(db, callback);
    });
};

var findAllMeetingsOfOneRoom = function(roomId, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
		DBmanager.findByParameters({"roomId":""+roomId}, db, callback);
    });
};

var removeMeeting = function(id, callback){
	mongoClient.connect(url, function(err, db) {
		DBmanager.setTable(table);
        DBmanager.remove(ObjectId(id), db, callback);
    });
};

exports.findAllMeetingsOfOneRoom = findAllMeetingsOfOneRoom;
exports.findMeeting = findMeeting;
exports.findAllMeetings = findAllMeetings;
exports.removeMeeting = removeMeeting;