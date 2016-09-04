var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');
var generator = require('../../utils/generator.js');
var logger = require('../../utils/logger_manager.js');
logger.defineModule("room");
/**
 * This function is used to do the corresponding
 * request ("GET") for "room" service.
 * @param callback {function}
 */
var getRoom = function(callback){
    var endPoint = routes.rooms.URI();
    request.buildRequest(method.get, endPoint, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.getRoom = getRoom;
/**
 * This function is used to do the corresponding
 * request ("GET") for "room" service.
 * @param roomId {string}
 * @param callback {function}
 */
var getRoomById = function(roomId, callback){
    var endPoint = routes.rooms.URI(roomId);
    request.buildRequest(method.get, endPoint, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.getRoomById = getRoomById;
/**
 * This function is used to do the corresponding request
 * ("GET") for "room" service that include the service ID.
 * @param serviceId {string}
 * @param roomId {string}
 * @param callback {function}
 */
var getRoomByService = function(serviceId, roomId, callback){
    var endPoint = routes.rooms.URIByService(serviceId, roomId);
    request.buildRequest(method.get, endPoint, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.getRoomByService = getRoomByService;
/**
 * This function is used to do the corresponding request
 * ("GET") for "room" service that include the service ID.
 * @param serviceId {string}
 * @param callback {function}
 */
var getRoomsByService = function(serviceId, callback){
    var endPoint = routes.rooms.URIByService(serviceId);
    request.buildRequest(method.get, endPoint, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.getRoomsByService = getRoomsByService;
/**
 * This function is used to do the corresponding request
 * ("PUT") for "room".
 * @param roomId {string}
 * @param body {string}
 * @param callback {function}
 */
var putRoom = function(roomId, body, callback){
    var endPoint = routes.rooms.URI(roomId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.putRoom = putRoom;
/**
 * This function is used to do the corresponding request
 * ("PUT") for "room" with an incorrect response token.
 * @param roomId {string}
 * @param body {string}
 * @param callback {function}
 */
var putRoomIncorrectAuthorization = function(roomId, body, callback){
    var endPoint = routes.rooms.URI(roomId);
    var authorization = generator.generateValues();
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.putRoomIncorrectAuthorization = putRoomIncorrectAuthorization;
/**
 * This function is used to do the corresponding request
 * ("PUT") for "room" service that include the resource ID.
 * @param serviceId {string}
 * @param roomId {string}
 * @param body {string}
 * @param callback {function}
 */
var putRoomByService = function(serviceId, roomId, body, callback){
    var endPoint = routes.rooms.URIByService(serviceId, roomId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.putRoomByService = putRoomByService;
/**
 * This function is used to do the corresponding
 * request ("POST") for "room" service.
 * @param roomId {string}
 * @param body {string}
 * @param callback {function}
 */
var postRoomResource= function(roomId, body, callback){
    var endPoint = routes.rooms.URI(roomId) + "/resources?type=bulk";
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        logger.log(err);
        callback(err, res);
    });
};
exports.postRoomResource = postRoomResource;