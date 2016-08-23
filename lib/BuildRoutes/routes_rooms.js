var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is to build a room URI according to the argument that receive
 * this function.
 * @param id {string} it is optional
 * @returns {string}
 * @constructor
 */
var URI = function(id){
    return build.buildRoute(config.endPoints.rooms, prefix, suffix, id);
};
exports.URI = URI;

/**
 * This function is to build a room URI by specific service, there are two cases.
 * e.g.
 * case 1: without roomId
 *          rootURI/services/{:serviceId}/rooms/
 * case 2: with roomId
 *          rootURI/services/{:serviceId}/rooms/{:roomId}
 * @param serviceId {string}
 * @param roomId {string} it is optional
 * @returns {string}
 * @constructor
 */
var URIByService = function(serviceId, roomId){
    suffix.push({"address" : config.endPoints.rooms, "id" : roomId});
    var endPoint = build.buildRoute(config.endPoints.services, prefix, suffix, serviceId);
    suffix = [];
    return endPoint;
};
exports.URIByService = URIByService;