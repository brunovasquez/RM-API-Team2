var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
/**
 * This function is used to do the corresponding
 * request ("GET") for "public - key" service.
 * @param callback {function}
 */
var getServiceTypes = function(callback){
    var endPoint = routes.servicesTypes.URI();

    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getServiceTypes = getServiceTypes;