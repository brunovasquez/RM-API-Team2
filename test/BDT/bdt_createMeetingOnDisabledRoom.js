/*
	Feature: Meeting API

	Scenario: Create a new Meeting on a disabled Room
		Given a disabled room
		When I create a new meeting on this room
		Then the meeting is rejected




 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');


describe('Feature: Meeting API', function(){
	context('Scenario: Create a new Meeting on a disabled Room', function(){

		this.slow(config.timeSlow);
	    this.timeout(config.timeOut);

	    var room;
	    var roomId;
	    var serviceId;
	    var meetingId;
	    var requestStatus;

	    before(function(done){
	        request.authentication.postLogin(function(err, res){
	            done();
	        });
	    });

	    it('Given a disabled room',function(done){
	    	dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
				dbQuery.preCondition.findAllRoomsOfOneService(serviceId, function(res){
					room = res[0];
					roomId = res[0]._id;
					var body = {enabled: false};
					request.room.putRoom(roomId, body, function(err, res){
						done();
					});
				});
            });
	    });

	    it('When I create a new meeting on this room',function(done){
	    	var meetingBody = generator.generator_meeting.generateMeeting(room);
	    	request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
				requestStatus = res.status;
                meetingId = res.body._id;
                done();              
            });
	    });

	    it('Then the meeting is rejected',function(done){
	    	expect(requestStatus).to.not.equal(200);
	    	done();
	    });

		after(function(done){
			var body = {enabled: true};
			request.room.putRoom(roomId, body, function(err, res){
				if(meetingId){
					request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
						done();
					});
				}
				else{
					done();
				}
			});

		});

	});
});