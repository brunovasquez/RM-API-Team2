var config = require('../../config/config.json');
var method = require('../../config/method.json');
var build = require('../BuildRoutes/buildRoutes.js');

var prefix = [];
var suffix = [];

/**
 * This function is to build a authentication URI.
 * @returns {string}
 * @constructor
 */

var URI = function(){
    return build.buildRoute(config.endPoints.login, prefix, suffix);
};
exports.URI = URI;