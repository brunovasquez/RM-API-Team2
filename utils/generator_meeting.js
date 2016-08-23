var generator = require('../utils/generator.js');
var config = require('../config/config.json');


var start = new Date();
var end = new Date (Date.now() + 60000);
var email =  config.exchange.hostname.replace(config.exchange.hostname.split('.')[0]+".", "@")  ;
var meeting = {
  "organizer": "User",
  "title": "meetingTitle",
  "start": "2015-03-05T23:00:00.000Z",
  "end": "2015-03-05T23:30:00.000Z",
  "location": "Room 102",
  "roomEmail": "room102@myexchange.com",
  "resources": [
    "room102@myexchange.com"
  ],
  "attendees": [
    "User@myexchange.com"
  ],
  "optionalAttendees":["User@myexchange.com"]
}
;
var generateMeeting = function(room){
    meeting.organizer = config.domainCredentials.username;
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
