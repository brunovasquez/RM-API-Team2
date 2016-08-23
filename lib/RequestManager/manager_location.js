var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');
var generator = require('../../utils/generator.js');
/**
 * This function is used to do the corresponding
 * request ("GET") for "location" service.
 * @param callback {function}
 */
var getLocations = function(callback){
    var endPoint = routes.location.URI();
    var dataRequest = {};

    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getLocations = getLocations;
/**
 * This function is used to do the corresponding
 * request ("GET") for "location" service by ID.
 * @param locationId {string}
 * @param callback {function}
 */
var getLocationById = function(locationId, callback){
    var endPoint = routes.location.URI(locationId);
    var dataRequest = {};

    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getLocationById = getLocationById;
/**
 * This function is used to do the corresponding
 * request ("POST") for "location" service.
 * @param body {string}
 * @param callback {function}
 */
var postLocation = function(body, callback){
    var endPoint = routes.location.URI();
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postLocation = postLocation;
/**
 * This function is used to do the corresponding
 * request ("POST") for "location" service with an incorrect response token.
 * @param body {string}
 * @param callback {function}
 */
var postLocationIncorrectAuthorization = function(body, callback){
    var endPoint = routes.location.URI();
    var authorization = generator.generateValues();
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postLocationIncorrectAuthorization = postLocationIncorrectAuthorization;
/**
 * This function is used to do the corresponding
 * request ("PUT") for "location" service.
 * @param locationId {string}
 * @param body {string}
 * @param callback {function}
 */
var putLocation = function(locationId, body, callback){
    var endPoint = routes.location.URI(locationId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization, "body" : body};

    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putLocation = putLocation;
/**
 * This function is used to do the corresponding
 * request ("DELETE") for "location" service.
 * @param locationId {string}
 * @param callback {function}
 */
var delLocation = function(locationId, callback){
    var endPoint = routes.location.URI(locationId);
    var authorization = config.typeAuthentication.jwt;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delLocation = delLocation;