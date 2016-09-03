/**
 * Log Management Module in charged to call the instance
 * of the log4js package to manage the logs of all tests.
 * @type {*}
 */
var logger = require('./logger.js');
var logModule;

exports.defineModule = function (module) {
    logModule = logger.getLogger(module);
}

exports.log = function (err) {
    //logModule.debug(method + " " + endpoint);

    if(err!=null) {
        logModule.error(err.status);
        logModule.error(err.response);
    }

}

