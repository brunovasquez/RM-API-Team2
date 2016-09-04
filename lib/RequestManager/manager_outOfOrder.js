var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');

/**
 * This function is to organize parameters for building the request to create an out of orders.
 * This uses buildRequest.
 * @param serviceId {string}
 * @param roomId {string}
 * @param outOfOrderBody {json}
 * @param complementUrl {string} it is optional in the case that this parameter is sent
 * it can be "?active=true&email=true" that is to active the out of order and create meeting.
 * @param callback {function}
 */
var postOutOfOrder = function(serviceId, roomId, outOfOrderBody, complementUrl, callback){
    var endPoint = routes.outOfOrder.URIByRoomOfService(serviceId, roomId);
    if(complementUrl !== undefined){
        endPoint = endPoint + complementUrl;
    }
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": outOfOrderBody};
    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postOutOfOrder = postOutOfOrder;

/**
 * This function is to organize parameters for building the request to update the out of orders.
 * This uses buildRequest.
 * @param serviceId {string}
 * @param roomId {string}
 * @param outOfOrderId
 * @param outOfOrderBody {json}
 * @param complementUrl {string} it is optional in the case that this parameter is sent
 * it can be "?active=true&email=true" that is to active the out of order and create meeting.
 * @param callback {function}
 */
var putOutOfOrder = function(serviceId, roomId, outOfOrderId, outOfOrderBody, complementUrl, callback){
    var endPoint = routes.outOfOrder.URIByRoomOfService(serviceId, roomId, outOfOrderId);
    if(complementUrl !== undefined){
        endPoint = endPoint + complementUrl;
    }
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": outOfOrderBody};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putOutOfOrder = putOutOfOrder;

/**
 * This function is to organize parameters for building the request in order to delete a out of order
 * This uses buildRequest
 * @param serviceId {string}
 * @param roomId {string}
 * @param outOfOrderId {string}
 * @param callback {function}
 */
var delOutOfOrder = function(serviceId, roomId, outOfOrderId, callback){
    var endPoint = routes.outOfOrder.URIByRoomOfService(serviceId, roomId, outOfOrderId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delOutOfOrder = delOutOfOrder;

/**
 * This function is to get all of out orders without specify the service.
 * This uses buildRequest
 * @param callback {function}
 */
var getOutOfOrders = function(callback){
    var endPoint = routes.outOfOrder.URI();
    var dataRequest = {};
    request.buildRequest(method.get, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.getOutOfOrders = getOutOfOrders;

/**
 * This function is to get a out of order by id without specify the service
 * This uses buildRequest
 * @param outOfOrderId {string}
 * @param callback {function}
 */
var getOutOfOrderById = function(outOfOrderId, callback){
     var endPoint = routes.outOfOrder.URI(outOfOrderId);
     var dataRequest = {};
     request.buildRequest(method.get, endPoint, dataRequest, function(err, res){
     callback(err, res);
     });
};
exports.getOutOfOrderById = getOutOfOrderById;

/**
 * This function is to get all out of orders by room, is necessary specify the service Id
 * This uses buildRequest
 * @param serviceId {string}
 * @param roomId {string}
 * @param outOfOrderId {string}
 * @param callback {function}
 */
var getOutOfOrderByRoom = function(serviceId, roomId, outOfOrderId, callback){
    if(arguments.length === 3) {
        callback = outOfOrderId;
        outOfOrderId = undefined;
    }
    var endPoint = routes.outOfOrder.URIByRoomOfService(serviceId, roomId, outOfOrderId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest(method.get, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.getOutOfOrderByRoom = getOutOfOrderByRoom;