var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

/*
 Given I have the "Use Room Manager Impersonation" option checked
 When I select some Room
    Then ensure that the room is selected
 When I create a meeting for 'User1' as organizer with Lucero's account
    Then ensure the meeting has been created with 'User1' as organizer
*/

var serviceId;
var room;
var body = {"impersonate":true};
var meetingBody;
var organizer;

describe("Given I have the 'Use Room Manager Impersonation' option checked", function(){
    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                request.services.putService(serviceId, body, function(err, res){
                    done();
                });
            });
        });
    });
    context("When I select some Room", function(){
        before(function(done){
            dbQuery.preCondition.findAllRooms(function(res){
                var index = Math.floor((Math.random() * res.length));
                room = res[index];
                done();
            });
        });
        it("Then ensure that the room is selected", function(){
            //if the room ID is undefined the room has not been selected.
            expect(room._id).not.equal(undefined);
        });
    });
    context("When I create a meeting for 'User1' as organizer with Lucero's account", function(){
        before(function(done){
            var roomId = room._id;
            meetingBody = generator.generator_meeting.generateMeeting(room);
            meetingBody.organizer = "User1";
            config.domainCredentials.username = "Lucero";
            request.meeting.postImpersonateMeeting(serviceId, roomId, meetingBody, function(err, res){
               organizer = res.body.organizer;
                done();
            });
        });
        it("Then ensure the meeting has been created, impersonating 'User1' as organizer", function(){
            expect(organizer).to.equal(meetingBody.organizer);
        });
    });
});

