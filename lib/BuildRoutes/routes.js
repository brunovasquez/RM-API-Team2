var authentication = require('../BuildRoutes/routes_authentication.js');
exports.authentication = authentication;

var location = require('../BuildRoutes/routes_location.js');
exports.location = location;

var meetings = require('../BuildRoutes/routes_meetings.js');
exports.meetings = meetings;

var outOfOrder = require('../BuildRoutes/routes_out-of-orders.js');
exports.outOfOrder = outOfOrder;

var publicKey = require('../BuildRoutes/routes_public-key.js');
exports.publicKey = publicKey;

var resource = require('../BuildRoutes/routes_resource.js');
exports.resource = resource;

var rooms = require('../BuildRoutes/routes_rooms.js');
exports.rooms = rooms;

var services = require('../BuildRoutes/routes_services.js');
exports.services = services;

var attendees = require('../BuildRoutes/routes_attendees.js');
exports.attendees = attendees;

var servicesTypes = require('../BuildRoutes/routes_services-types.js');
exports.servicesTypes = servicesTypes;