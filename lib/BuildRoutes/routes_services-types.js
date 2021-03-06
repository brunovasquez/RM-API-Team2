var config = require('../../config/config.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is to build a service-types URI.
 * @returns {string}
 * @constructor
 */

var URI = function(){
    return build.buildRoute(config.endPoints.serviceTypes, prefix, suffix);
};
exports.URI = URI;
