/*
Feature: Meeting API
Scenario: Create a meeting using impersonation with attendees and optional attendees

 Given I have a room with no meetings created
	And I have the impersonation enabled
    And I have the impersonation enabled
    And I have an account 'Account_1' and 'Account_2' with the permission over the room
 When I have a meeting on behalf of 'Account_1' specifying the 'Account_2'
    And it is specified the meeting's title as 'Crazy party'
    And it is specified the 'Account_3' as attendee
	And it is specified the account 'Account_4' as optional attendee
    And create the meeting with all the specifications
Then ensure the organizer of the meeting created is 'Account_1'
	And the meeting's title is 'Coding Dojo'
	And the 'Account_3' is present in the attendee field
	And the 'Account_4' is present in the optional attendee field
*/

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Feature: Meeting API", function () {
   context("Scenario: Create a meeting using impersonation with attendees and optional attendees",function () {
       var account1;
       var account3;
       var account4;
       var accountListActual;
       var serviceId;
       var room;
       var meetingBody;
       var meetingResponse;
       before(function(done){
           var filter = "a";
           request.authentication.postLogin(function(err, res){
               dbQuery.preCondition.findAllServices(function(res){
                   serviceId = res[0]._id;
                   request.services.getAttendeesByService(serviceId, filter, function(err, res) {
                       accountListActual = res.body;
                       done();
                   });
               });
           });
       });

       it("Given I have a room with no meetings created",function (done) {
           dbQuery.preCondition.findAllRooms(function(res){
               var index = Math.floor((Math.random() * res.length));
               room = res[index];
               request.meeting.getMeetings(room._id,serviceId,function (err,res) {
                   var meetingsList = res.body;
                   (meetingsList instanceof Array) ? null : meetingsList = [];
                   meetingsList.forEach(meeting => {
                       request.meeting.delMeeting(serviceId,room._id,meeting._id,function (err,res) {})});
                   done();
               });
           });
       });

       it("And I have the impersonation enabled",function (done) {
           var body = {"impersonate":true};
           request.services.putService(serviceId, body, function(err, res){
               console.log(res.body);
               done();
           });
       });

       it("And I have an account 'Account_1' and 'Account_2' with the permission over the room", function () {
           account1 = accountListActual.shift().userPrincipalName+"1" ;
           config.domainCredentials.username = "administrator";
       });

       it("When I have a meeting on behalf of 'Account_1' specifying the 'Account_2'",function () {
           meetingBody = generator.generator_meeting.generateMeeting(room);
           meetingBody.organizer = account1;
           console.log(meetingBody.organizer);
       });

       it("And it is specified the meeting's title as 'Crazy party'",function () {
           meetingBody.title = "Crazy party";
       });

       it("And it is specified the 'Account_3' as attendee",function () {
           account3 = accountListActual.shift().userPrincipalName;
           meetingBody.attendees = [account3];
       });

       it("And it is specified the account 'Account_4' as optional attendee",function () {
           account4 = accountListActual.shift().userPrincipalName;
           meetingBody.optionalAttendees = [account4];
       });

       it("And create the meeting with all the specifications",function (done) {
           request.meeting.postImpersonateMeeting(serviceId, room._id, meetingBody, function(err, res){
               meetingResponse = res.body;
               console.log(meetingResponse);
               done();
           });
       });

       it("Then ensure the organizer of the meeting created is 'Account_1'",function () {
           expect(meetingResponse.organizer).to.equal(account1);
       });

       it("And the meeting's title is 'Crazy party'",function () {
           expect(meetingResponse.title).to.equal(meetingBody.title);
       });

       it("And the 'Account_3' is present in the attendee field",function () {
           expect(meetingResponse.attendees.shift()).to.equal(account3);
       });
       it("And the 'Account_4' is present in the optional attendee field",function () {
           expect(meetingResponse.optionalAttendees.shift()).to.equal(account4);
       });
       after(function(done){
           request.meeting.delMeeting(serviceId, room._id, meetingResponse._id, function(err, res){
                   done();
           });
       });
   });
});
