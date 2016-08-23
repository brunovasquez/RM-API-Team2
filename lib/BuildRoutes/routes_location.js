var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is to build a location URI according to the argument that receive
 * this function.
 * @param id {string} it is optional
 * @returns {string}
 * @constructor
 */
var URI = function(id){
    return build.buildRoute(config.endPoints.locations, prefix, suffix, id);
};
exports.URI = URI;