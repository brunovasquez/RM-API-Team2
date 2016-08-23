/**
 * Out-Of-Orders module
 * @module insertOutOfOrder, findOutOfOrderById,findOutOfOrderByIdByRoom,findAllOutOfOrders, removeOutOfOrder
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
var table = dbConfig.tables.outoforders;
/**
 * Insert by DB one out of order
 * @param {JSON} outOfOrderToInsert - Out of order structure
 * @param {function} callback - Script to manage the out-of-order object inserted
 */
var insertOutOfOrder = function(outOfOrderToInsert, callback){
    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.insert(outOfOrderToInsert, db, callback);
    });
};

var findOutOfOrderById = function(id, callback){
    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.find(ObjectId(id), db, callback);
    });
};
var findOutOfOrderByIdByRoom = function(roomId, outOfOrderId,callback){
    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.find(ObjectId(id), db, callback);
    });
};
var findAllOutOfOrders = function(callback){
    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.findAll(db, callback);
    });
};
var findAllOutOfOrdersByRoom = function(roomId,callback){
    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.findByParameters({"roomId":ObjectId(roomId)}, db, callback);
    });
};
/**
 * Deletes by DB one out of order
 * @param {String} id - Out of order id
 * @param {function} callback - Script to manage the out-of-order object deleted
 */
var removeOutOfOrder = function(id, callback){
    mongoClient.connect(url, function(err, db) {
        DBmanager.setTable(table);
        DBmanager.remove(ObjectId(id), db, callback);
    });
};

exports.insertOutOfOrder = insertOutOfOrder;
exports.findOutOfOrderById = findOutOfOrderById;
exports.findOutOfOrderByIdByRoom = findOutOfOrderByIdByRoom;
exports.findAllOutOfOrders = findAllOutOfOrders;
exports.removeOutOfOrder = removeOutOfOrder;
exports.findAllOutOfOrdersByRoom = findAllOutOfOrdersByRoom;

