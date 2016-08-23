var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is for building a URI for getting meetings of a specific
 * room, there are two cases.
 * e.g.
 * case 1: without meetingId
 *          rootURI/rooms/{:roomId}/meetings
 * case 2: with meetingId
 *          rootURI/rooms/{:roomId}/meetings/{:meetingId}
 * @param roomId {string}
 * @param meetingId {string} it is optional
 * @returns {string}
 * @constructor
 */
var URIByRoom = function(roomId, meetingId){
    prefix.push({"address" : config.endPoints.rooms, "id" : roomId});
    var endPoint = build.buildRoute(config.endPoints.meetings, prefix, suffix, meetingId);
    prefix = [];
    return endPoint
};
exports.URIByRoom = URIByRoom;

/**
 * This function is for building a URI for getting meetings of a specific
 * room and service, there are two cases.
 * e.g.
 * case 1: without meetingId
 *          rootURI/services/{:serviceId}/rooms/{:roomId}/meetings
 * case 2: with meetingId
 *          rootURI/services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}
 * @param serviceId {string}
 * @param roomId {string}
 * @param meetingId {string} it is optional
 * @returns {string}
 * @constructor
 */
var URIByRoomOfService = function(serviceId, roomId, meetingId){
    prefix.push({"address" : config.endPoints.services, "id" : serviceId});
    prefix.push({"address" : config.endPoints.rooms, "id" : roomId});
    var endPoint = build.buildRoute(config.endPoints.meetings, prefix, suffix, meetingId);
    prefix = [];
    suffix = [];
    return endPoint
};
exports.URIByRoomOfService = URIByRoomOfService;