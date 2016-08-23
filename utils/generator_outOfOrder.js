var ObjectId = require('mongodb').ObjectID;
var generator = require('../utils/generator.js');

var start = new Date();
var end = new Date (Date.now() + 60000);
/**
 * Out-Of-Order structure for manage in request
 * @type {JSON}
 */
var outOfOrder =
{
    "from" : "",
    "to" : "",
    "roomId" : "",
    "title" : "",
    "description" : "",
    "sendEmail" : true,
    "__v" : 0
};
/**
 * Generate a out of order from a start date and end date for a room
 * @param {Date} startDate - Out of order starts in this date time, this variable accepts any Date format
 * @param {Date} dueDate - Out of order ends in this date time, this variable accepts any Date format
 * @param {String} roomId - specific Room
 * @return {JSON} outOfOrder - JSON structure
 */
var generateOutOfOrder = function(roomId){
    outOfOrder.from = start.toISOString() ;
    outOfOrder.to = end.toISOString();
    outOfOrder.roomId = ObjectId(roomId);
    outOfOrder.title = generator.generateValues();
    outOfOrder.description = generator.generateValues();
    return outOfOrder;
};
exports.generateOutOfOrder = generateOutOfOrder;
/**
 * Updates a out of order with the current Id when this was inserted.
 */
var updateId = function(currentId){
    outOfOrder._id = currentId;
};
exports.updateId = updateId;
