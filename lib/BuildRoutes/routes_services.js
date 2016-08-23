var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is to build a service URI according to the argument that receive
 * this function.
 * @param id {string} it is optional
 * @returns {string}
 * @constructor
 */
var URI = function(id){
    return build.buildRoute(config.endPoints.services, prefix, suffix, id);
};
exports.URI = URI;