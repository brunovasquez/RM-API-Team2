var loggerConfig = require('../config/logger.json');
var log4js = require('log4js');

log4js.configure(loggerConfig.logger);

module.exports = log4js;