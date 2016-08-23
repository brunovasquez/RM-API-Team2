var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var method = require('../../config/method.json');
var config = require('../../config/config.json');

/**
 * This function is to get meeting by specific Id,
 * for getting a meeting is necessary build the end point with serviceId and roomId,
 * this function uses buildRequest function.
 * @param serviceId {string}
 * @param roomId {string}
 * @param meetingId {string}
 * @param callback {function}
 */
var getMeetingById = function(serviceId, roomId, meetingId, callback){
    var endPoint = routes.meetings.URIByRoomOfService(serviceId, roomId, meetingId);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getMeetingById = getMeetingById;

/**
 * This function is to get all meetings, for getting a meeting is necessary build
 * the end point with serviceId and roomId, this function uses buildRequest function.
 * this function uses buildRequest function.
 * @param serviceId {string}
 * @param roomId {string}
 * @param callback {function}
 */
var getMeetings = function(serviceId, roomId, callback){
    var endPoint = routes.meetings.URIByRoomOfService(serviceId, roomId);
    request.buildRequest(method.get, endPoint, function(err, res){
        callback(err, res);
    });
};
exports.getMeetings = getMeetings;

/**
 * This meeting is for create a meeting by API, is necessary build route with
 * serviceId, roomId and one json of meeting information. This function uses buildRequest function.
 * @param serviceId {string}
 * @param roomId {string}
 * @param meetingBody {json}
 * @param callback {function}
 */
var postMeeting = function(serviceId, roomId, meetingBody, callback){
    var endPoint = routes.meetings.URIByRoomOfService(serviceId, roomId);
    var authorization = config.typeAuthentication.basic;
    var dataRequest = {"Authorization" : authorization, "body": meetingBody};
    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postMeeting = postMeeting;

/**
 * This function is to do a request for updating a meeting created.
 * This function uses buildRequest function.
 * @param serviceId {string}
 * @param roomId {string}
 * @param meetingId {string}
 * @param meetingUpdate {json}
 * @param callback {function}
 */
var putMeeting = function(serviceId, roomId, meetingId, meetingUpdate, callback){
    var endPoint = routes.meetings.URIByRoomOfService(serviceId, roomId, meetingId);
    var authorization = config.typeAuthentication.basic;
    var dataRequest = {"Authorization" : authorization, "body" : meetingUpdate};
    request.buildRequest(method.put, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.putMeeting = putMeeting;

/**
 * This function is for deleting a meeting created, this function uses buildRequest function.
 * @param serviceId {string}
 * @param roomId {string}
 * @param meetingId {string}
 * @param callback {function}
 */
var delMeeting = function(serviceId, roomId, meetingId, callback){
    var endPoint = routes.meetings.URIByRoomOfService(serviceId, roomId, meetingId);
    var authorization = config.typeAuthentication.basic;
    var dataRequest = {"Authorization" : authorization};
    request.buildRequest(method.delete, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.delMeeting = delMeeting;

/**
 * This meeting is for create a meeting by API with impersonate mode, is necessary build route with
 * serviceId, roomId and one json of meeting information. This function uses buildRequest function.
 * @param serviceId {string}
 * @param roomId {string}
 * @param meetingBody {json}
 * @param callback {function}
 */
var postImpersonateMeeting = function(serviceId, roomId, meetingBody, callback){
    var endPoint = routes.meetings.URIByRoomOfService(serviceId, roomId) + '?misrepresent=false';
    var authorization = config.typeAuthentication.basic;
    var dataRequest = {"Authorization" : authorization, "body": meetingBody};
    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        callback(err, res);
    });
};
exports.postImpersonateMeeting = postImpersonateMeeting;
