var generator = require('../utils/generator.js');
var config = require('../config/config.json');


var start = new Date();
var end = new Date (Date.now() + 60000);
var email =  config.exchange.hostname.replace(config.exchange.hostname.split('.')[0]+".", "@")  ;
var meeting = {
  "organizer": "",
  "title": "",
  "start": "",
  "end": "",
  "location": "",
  "roomEmail": "",
  "resources": [
    ""
  ],
  "attendees": [
    ""],
  "optionalAttendees":[""]
}
;
var generateMeeting = function(room){
    meeting.organizer = config.roomManagerCredentials.username;
    meeting.title = generator.generateValues();
    meeting.start = start.toISOString();
    meeting.end = end.toISOString();
    meeting.location = room.displayName;
    meeting.roomEmail = room.emailAddress;
    meeting.resources = [room.emailAddress];
    meeting.attendees = [config.domainCredentials.username + email];
    meeting.optionalAttendees = [config.domainCredentials.username + email];

    return meeting;
};
exports.generateMeeting = generateMeeting;
