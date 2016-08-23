var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Meetings - Feature without creating meetings like precondition", function(){

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

    it('POST /services/{:serviceId}/rooms/{:roomId}/meetings', function(done){
        dbQuery.preCondition.findAllRooms(function(res){
            room = res[0];
            roomId = res[0]._id;
            var meetingBody = generator.generator_meeting.generateMeeting(room);
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                request.meeting.postMeeting(serviceId, roomId, meetingBody, function(err, res){
                    meetingId = res.body._id;
                    expect(res.status).to.equal(200);
                    done();
                });
            });
        });
    });

    describe('Meetings - Feature creating meetings like precondition', function(){
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

        it('GET /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns status code 200', function(done){
            request.meeting.getMeetingById(serviceId, roomId, meetingId, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/meetings, returns status code 200', function(done){
            request.meeting.getMeetings(serviceId, roomId, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('PUT /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns status code 200', function(done){
            var meetingBody = generator.generator_meeting.generateMeeting(room);
            request.meeting.putMeeting(serviceId, roomId, meetingId, meetingBody, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('DELETE /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId}, returns status code 200', function(done){
            request.meeting.delMeeting(serviceId, roomId, meetingId, function(err, res){
                meetingId = undefined;
                expect(res.status).to.equal(200);
                done();
            });
        });

    });
});