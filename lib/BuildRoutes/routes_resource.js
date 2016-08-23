var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is to build a resource URI according to the argument that receive
 * this function.
 * @param id {string} it is optional
 * @returns {string}
 * @constructor
 */
var URI = function(id){
    return build.buildRoute(config.endPoints.resources, prefix, suffix, id);
};
exports.URI = URI;

/**
 * This function is for building a URI for getting resources of a specific
 * room, there are two cases.
 * e.g.
 * case 1: without roomResourceId
 *          rootURI/rooms/{:roomId}/resources
 * case 2: with roomResourceId
 *          rootURI/rooms/{:roomId}/resources/{:roomResourceId}
 * @param roomId {string}
 * @param resourceId {string} it is optional
 * @returns {string}
 * @constructor
 */
var URIByRoom = function(roomId, resourceId){
    prefix.push({"address" : config.endPoints.rooms, "id" : roomId});
    var endPoint = build.buildRoute(config.endPoints.resources, prefix, suffix, resourceId);
    prefix = [];
    return endPoint
};
exports.URIByRoom = URIByRoom;

/**
 * This function is for building a URI for getting resources of a specific
 * room and service, there are two cases.
 * e.g.
 * case 1: without roomResourceId
 *          rootURI/services/{:serviceId}/rooms/{:roomId}/resources
 * case 2: with roomResourceId
 *          rootURI/services/{:serviceId}/rooms/{:roomId}/resources/{:roomResourceId}
 * @param serviceId {string}
 * @param roomId {string}
 * @param roomResourceId {string} it is optional
 * @returns {string}
 * @constructor
 */
var URIByRoomOfService = function(serviceId, roomId, roomResourceId){
    prefix.push({"address" : config.endPoints.services, "id" : serviceId});
    prefix.push({"address" : config.endPoints.rooms, "id" : roomId});
    var endPoint = build.buildRoute(config.endPoints.resources, prefix, suffix, roomResourceId);
    prefix = [];
    return endPoint
};
exports.URIByRoomOfService = URIByRoomOfService;