var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is for building a URI for getting out of orders of a specific
 * room and service, there are two cases.
 * e.g.
 * case 1: without outOfOrderId
 *          rootURI/services/{:serviceId}/rooms/{:roomId}/out-of-order
 * case 2: with outOfOrderId
 *          rootURI/services/{:serviceId}/rooms/{:roomId}/out-of-order/{:out-of-order}
 * @param serviceId {string}
 * @param roomId {string}
 * @param outOfOrderId {string} it is optional
 * @returns {string}
 * @constructor
 */
var URIByRoomOfService = function(serviceId, roomId, outOfOrderId){
    prefix.push({"address" : config.endPoints.services, "id" : serviceId});
    prefix.push({"address" : config.endPoints.rooms, "id" : roomId});
    var endPoint = build.buildRoute(config.endPoints.outOfOrders, prefix, suffix, outOfOrderId);
    prefix = [];
    suffix = [];
    return endPoint
};
exports.URIByRoomOfService = URIByRoomOfService;

/**
 * This function is for building a route of out of orders.
 * case 1: without outOfOrderId
 *          rootURI/out-of-order
 * case 2: with outOfOrderId
 *          rootURI/out-of-order/{:out-of-order}
 * @param id {string} it is optional
 * @returns {string}
 * @constructor
 */
var URI = function(outOfOrderId){
    return build.buildRoute(config.endPoints.outOfOrders, prefix, suffix, outOfOrderId);
};
exports.URI = URI;