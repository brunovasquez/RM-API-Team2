/**
 * Log Management Module in charged to call the instance
 * of the log4js package to manage the logs of all tests.
 * @type {*}
 */
var logger = require('./logger.js');
var fs = require('fs');
var logModule;
var dir = './logs';

exports.defineModule = function (module) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    else{
        logModule = logger.getLogger(module);
    }
}

exports.log = function (err) {
    if(err!=null) {
        logModule.error(err.response.error);
    }

}

