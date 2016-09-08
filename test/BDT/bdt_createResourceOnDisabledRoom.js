/*
 Feature: Resource API

 Scenario: Create a new Resource on a disabled Room
 Given a disabled room
    And a resource created
 When I create a new resource on this room
 Then the resource is created
 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');
var helper = require('../../utils/helper.js');

describe('Feature: Resource API', function(){
    context('Scenario: Create a new Resource on a disabled Room', function(){

        this.slow(config.timeSlow);
        this.timeout(config.timeOut);

        var room;
        var roomId;
        var serviceId;
        var resourceId;
        var roomResourceId;
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
        it('And a resource created', function (done) {
            var resourceBody = generator.generator_resource.generateResource();
            dbQuery.preCondition.insertResource(resourceBody,function(res) {
                roomResourceId = res._id;
                done();
            });
        });
        it('When I create a new resource on this room',function(done){
            var resourceJSON = generator.generator_resource.generateResource();
            generator.generator_resource.setPropertiesResource(roomResourceId);
            request.resource.postResourceByRoomId(resourceJSON, roomId, function(err, res){
                requestStatus = res.status;
                resourceId = helper.compareResourceByResourceId(res.body.resources,resourceJSON.resourceId).shift()._id;
                done();
            });
        });

        it('Then the resource is created',function(done){
            expect(requestStatus).to.equal(config.statusCode.OK);
            done();
        });

        after(function(done){
            var body = {enabled: true};
            request.room.putRoom(roomId, body, function(err, res){
              request.resource.delResourceByRoom(roomId,resourceId, function(err, res){
                  request.resource.delResource(roomResourceId,function (err,res) {
                      done();
                  });

              });

            });

        });

    });
});