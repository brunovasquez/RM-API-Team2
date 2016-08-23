var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD: for API Meetings", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room;
    var roomId;
    var serviceId;
    var meetingId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    

    afterEach(function(done){
        if (meetingId !== undefined) {
            request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
                done();
            });
        }else{
            done();
        }
    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/meetings create a new meeting', function(done){
        dbQuery.preCondition.findAllRooms(function(res){
            room = res[0];
            roomId = res[0]._id;
            var meetingBody = generator.generator_meeting.generateMeeting(room);
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                    meetingId = res.body._id;
                    var actualResult = res.body;
                    dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                        expect(result.title).to.equal(actualResult.title);
                        expect(result.start.toISOString()).to.equal(actualResult.start);
                        expect(result.end.toISOString()).to.equal(actualResult.end);
                        done();
                    });
                });
            });
        });
    });

    describe('', function(){
        beforeEach(function(done){
            dbQuery.preCondition.findAllRooms(function(res){
                room = res[0];
                roomId = res[0]._id;
                var meetingBody = generator.generator_meeting.generateMeeting(room);
                dbQuery.preCondition.findAllServices(function(res){
                    serviceId = res[0]._id;
                    request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                        meetingId = res.body._id;
                        done();
                    });
                });
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns the specified meeting', function(done){
            request.meeting.getMeetingById(serviceId, roomId, meetingId, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                    expect(result.title).to.equal(actualResult.title);
                    expect(result.start.toISOString()).to.equal(actualResult.start);
                    expect(result.end.toISOString()).to.equal(actualResult.end);
                    done();
                });
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/meetings, returns all meetings of a room', function(done){
            request.meeting.getMeetings(serviceId, roomId, function(err, res){
                var actualResult = res.body.length;
                dbQuery.assertion.verifyAllMeetingsOfOneRoom(roomId, function(result){
                    expect(actualResult).to.equal(result.length);
                    done();
                });
            });
        });

        it('PUT /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, modifies the specified meeting', function(done){
            var meetingBody = generator.generator_meeting.generateMeeting(room);
            request.meeting.putMeeting(serviceId, roomId, meetingId, meetingBody, function(err, res){       
                var actualResult = res.body;
                dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                    expect(result.title).to.equal(actualResult.title);
                    expect(result.start.toISOString()).to.equal(actualResult.start);
                    expect(result.end.toISOString()).to.equal(actualResult.end);
                    done();
                });
            });
        });

        it('DELETE /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, deletes the specified meeting', function(done){
            request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
                meetingId = undefined;
                dbQuery.assertion.verifyMeetingExist(res.body._id, function(result){
                    expect(undefined).to.equal(result);
                    done();
                });
            });
        });

    });
});
