var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');
var headersArray = [];
/**
 * This function is used to do the corresponding
 * request ("GET") for "public - key" service.
 * @param callback {function}
 */
var getPublicKey = function(callback){
    var endPoint = routes.publicKey.URI();

    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getPublicKey = getPublicKey;