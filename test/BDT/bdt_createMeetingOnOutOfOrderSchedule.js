/*
	Feature: Meeting API

	Scenario: Create a new Meeting on a Room Out of order schedule
		Given an out of order was scheduled in a room
		When I create a new meeting with the same schedule
		Then the meeting is rejected


 var body = generator.generator_room.generateRoom();
 roomName=body.customDisplayName;
 request.room.putRoom(roomID, body, function(err, res){
 expect(res.body._id).to.equal(roomID.toString());
 expect(res.body.customDisplayName).to.equal(roomName);
 done();
 });

 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');


describe('Feature: Meeting API', function(){
	context('Scenario: Create a new Meeting on a Room Out of order schedule', function(){

		this.slow(config.timeSlow);
	    this.timeout(config.timeOut);

	    var room;
	    var roomId;
	    var serviceId;
	    var meetingId;
	    var startDate;
	    var endDate;
	    var requestStatus;

	    before(function(done){
	        request.authentication.postLogin(function(err, res){
	            done();
	        });
	    });

	    it('Given an out of order was scheduled in a room',function(done){
	    	dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
				dbQuery.preCondition.findAllRoomsOfOneService(serviceId, function(res){
					room = res[0];
					roomId = res[0]._id;
					var complementUrl = "?active=true&email=true";
					var outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(roomId);
					startDate = outOfOrderBody.from;
					endDate = outOfOrderBody.to;
					request.outOfOrders.postOutOfOrder(serviceId, roomId, outOfOrderBody, complementUrl,function(err, res){
						var actualResult = res.body;
						done();

					});
				});
            });
	    });

	    it('When I create a new meeting with the same schedule',function(done){
	    	var meetingBody = generator.generator_meeting.generateMeeting(room);
	    	meetingBody.start = startDate;
	    	meetingBody.end = endDate;
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