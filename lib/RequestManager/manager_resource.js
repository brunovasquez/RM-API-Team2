var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
/**
 * This function is used to do the corresponding
 * request ("GET") for "resource" service.
 * @param callback {function}
 */
var getResources = function(callback){
    var endPoint = routes.resource.URI();
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResources = getResources;
/**
 * This function is used to do the corresponding
 * request ("GET") for "resource" service.
 * @param resourceId {string}
 * @param callback {function}
 */
var getResourceById = function(resourceId, callback){
    var endPoint = routes.resource.URI(resourceId);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourceById = getResourceById;
/**
 * This function is used to do the corresponding
 * request ("GET") for a "resource" service.
 * @param roomId {string}
 * @param callback {function}
 */
var getResourcesByRoom = function(roomId, callback){
    var endPoint = routes.resource.URIByRoom(roomId);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourcesByRoom = getResourcesByRoom;
/**
 * This function is used to do the corresponding request
 * ("GET") for "resource" service that include the resource ID.
 * @param roomId {string}
 * @param resourceId {string}
 * @param callback {function}
 */
var getResourceByRoomId = function(roomId, resourceId, callback){
    var endPoint = routes.resource.URIByRoom(roomId, resourceId);
    request.buildRequest(method.get, endPoint, function(err, res){
     callback(err, res);
 });
};
 exports.getResourceByRoomId = getResourceByRoomId;
/**
 * This function is used to do the corresponding request
 * ("GET") for "resource" service that include the resource ID.
 * @param serviceId {string}
 * @param roomId {string}
 * @param callback {function}
 */
var getResourcesByRoomOfService = function(serviceId, roomId, callback){
    var endPoint = routes.resource.URIByRoomOfService(serviceId, roomId);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourcesByRoomOfService = getResourcesByRoomOfService;
/**
 * This function is used to do the corresponding
 * request ("POST") for "resource" service.
 * @param serviceId {string}
 * @param roomId {string}
 * @param roomResourceId {string}
 * @param callback {function}
 */
var getResourceByRoomOfService = function(serviceId, roomId, roomResourceId, callback){
    var endPoint = routes.resource.URIByRoomOfService(serviceId, roomId, roomResourceId);

    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getResourceByRoomOfService = getResourceByRoomOfService;
/**
 * This function is used to do the corresponding
 * request ("POST") for "resource" service.
 * @param resourceBody {string}
 * @param callback {function}
 */
var postResource = function(resourceBody, callback){
    var endPoint = routes.resource.URI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": resourceBody};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postResource = postResource;
/**
 * This function is used to do the corresponding
 * request ("POST") for "resource" service.
 * @param resourceBody {string}
 * @param serviceId {string}
 * @param roomId {string}
 * @param callback {function}
 */
var postResourceByRoomOfService = function(resourceBody, serviceId, roomId, callback){
    var endPoint = routes.resource.URIByRoomOfService(serviceId, roomId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": resourceBody};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postResourceByRoomOfService = postResourceByRoomOfService;
/**
 * This function is used to do the corresponding request
 * ("POST") for "resource" service that include the resource ID.
 * @param resourceBody {string}
 * @param roomId {string}
 * @param callback {function}
 */
var postResourceByRoomId = function(resourceBody, roomId, callback){
    var endPoint = routes.resource.URIByRoom(roomId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body": resourceBody};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postResourceByRoomId = postResourceByRoomId;
/**
 * This function is used to do the corresponding
 * request ("PUT") for "resource" service.
 * @param resourceId {string}
 * @param body {string}
 * @param callback {function}
 */
var putResource = function(resourceId, body, callback){
    var endPoint = routes.resource.URI(resourceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putResource = putResource;
/**
 * This function is used to do the corresponding
 * request ("PUT") for "resource" service.
 * @param serviceId {string}
 * @param roomId {string}
 * @param roomResourceId {string}
 * @param body {string}
 * @param callback {function}
 */
var putResourceByRoomOfService = function(serviceId, roomId, roomResourceId, body, callback){
    var endPoint = routes.resource.URIByRoomOfService(serviceId, roomId, roomResourceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putResourceByRoomOfService = putResourceByRoomOfService;
/**
 * This function is used to do the corresponding request
 * ("PUT") for "resource" service that include the resource ID.
 * @param roomId {string}
 * @param resourceId {string}
 * @param body {string}
 * @param callback {function}
 */
var putResourceByRoom = function(roomId, resourceId, body, callback){
    var endPoint = routes.resource.URIByRoom(roomId, resourceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putResourceByRoom = putResourceByRoom;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for "resource" service.
 * @param resourceId {string}
 * @param callback {function}
 */
var delResource = function(resourceId, callback){
    var endPoint = routes.resource.URI(resourceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};

    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delResource = delResource;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for "resource" service.
 * @param body {json}
 * @param callback {function}
 */
var delResources = function(body, callback){
    var endPoint = routes.resource.URI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delResources = delResources;
/**
 * This function is used to do the corresponding request
 * ("DELETE") for "resource" service that include the resource ID.
 * @param roomID {string}
 * @param resourceID {string}
 * @param callback {function}
 */
var delResourceByRoom = function(roomID, resourceID, callback){
    var endPoint = routes.resource.URIByRoom(roomID, resourceID);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delResourceByRoom = delResourceByRoom;
/**
 * This function is used to do the corresponding request
 * ("DELETE") for "resource" service that include the resource ID.
 * @param serviceId {string}
 * @param roomID {string}
 * @param roomResourceId {string}
 * @param callback {function}
 */
var delResourceByRoomOfService = function(serviceId, roomID, roomResourceId, callback){
    var endPoint = routes.resource.URIByRoomOfService(serviceId, roomID, roomResourceId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delResourceByRoomOfService = delResourceByRoomOfService;
