/*
 Feature: Location API

 Scenario: Add a Location on a Room
 Given I have a location
 And I have Room
 When I assign a location on this room
 Then the location should be assigned in the room
 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');


describe('Feature: Location API', function(){
    context('Scenario: Add a Location in a Room', function(){

        this.slow(config.timeSlow);
        this.timeout(config.timeOut);

        var room;
        var roomId;
        var locationId;
        var bodyLocation;

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

        it('I assign a location on this room',function(done){
            var body = generator.generator_room.generateRoomWithLocation(locationId);
            request.room.putRoom(roomId, body, function(err, res){
                room = res.body;
                expect(res.status).to.equal(config.statusCode.OK);
                done();
            });
        });

        it('Then the location should be assigned in the room',function(done){
            expect(locationId).to.equal(room.locationId);
            done();
        });

        after(function(done){
            var body = generator.generator_room.generateRoom();
            request.room.putRoom(roomId, body, function(err, res){
                request.location.delLocation(locationId, function(err,res){
                    dbQuery.assertion.verifyLocationExist(res.body._id, function(result){
                        expect(undefined).to.equal(result);
                        done();
                    });
                });
            });

        });

    });
});