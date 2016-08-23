var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];
/**
 * This function builds an attendees route
 * @param {String} serviceId - Service code
 * @return {String} endPoint - Returns the URI like https://{ip}:4040/services/{serviceId}/attendees
 */
var URIByService = function(serviceId){
    prefix.push({"address" : config.endPoints.services, "id" : serviceId});
    var endPoint = build.buildRoute(config.endPoints.attendees, prefix, suffix);
    prefix = [];
    return endPoint;
};
exports.URIByService = URIByService;