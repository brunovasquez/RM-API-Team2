/*
 Feature: Location API
 Scenario: Delete a location associated to a Room
 Given I have a location
 And I have Room
 And I assign a location on this room
 When I Delete de location
 Then the deleted location should not be assigned to any 'room A'
 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe('Feature: Location API', function (done) {
    context('Scenario: Delete a location associated to a Room', function (done) {

        this.slow(config.timeSlow);
        this.timeout(config.timeOut);

        var room;
        var roomId;
        var bodyLocation;
        var locationId;

        before(function(done){
            request.authentication.postLogin(function(err, res){
                done();
            });
        });

        it('Given I have a location',function(done){
            bodyLocation = generator.generator_location.generateLocation();
            request.location.postLocation(bodyLocation, function(err, res){
                locationId = res.body._id;
                expect(res.status).to.equal(config.statusCode.OK);
                done();
            });
        });

        it('And I have a room',function(done){
            dbQuery.preCondition.findAllRooms(function(res){
                roomId = res[0]._id;
                request.room.getRoomById(roomId, function(err, res){
                    expect(res.status).to.equal(config.statusCode.OK);
                    done();
                });
            });
        });

        it('And I assign a location on this room',function(done){
            var body = generator.generator_room.generateRoomWithLocation(locationId);
            request.room.putRoom(roomId, body, function(err, res){
                room = res.body;
                expect(res.status).to.equal(config.statusCode.OK);
                done();
            });
        });

        it('When I Delete location', function(done){
                request.location.delLocation(locationId, function(err,res){
                    dbQuery.assertion.verifyLocationExist(res.body._id, function(result){
                        expect(undefined).to.equal(result);
                        done();
                    });
            });
        });

        it('Then the deleted location should not be assigned into the \'room A\'', function (done) {
            dbQuery.preCondition.findAllRooms(function(res){
                roomId = res[0]._id;
                request.room.getRoomById(roomId, function(err, res){
                    room = res.body;
                    expect(res.status).to.equal(config.statusCode.OK);
                    expect(room.locationId).null;
                    done();
                });
            });
        });

    });

});