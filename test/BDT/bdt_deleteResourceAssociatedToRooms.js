/*
 Feature: Resource API

 Scenario: Delete a resource associated to a Room
 Given I have a created resource
 And I Add the resource to a 'Room A'
 And I add the resource to a 'Room B'
 When I Delete de resource
 Then the deleted resource should not be assigned to any 'room A'
 Then the deleted resource should not be assigned to any 'room B'

 */

var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe('Feature: Resource API', function () {
   context('Scenario: Delete a resource associated to a Room', function () {

       this.slow(config.timeSlow);
       this.timeout(config.timeOut);

       var serviceId;
       var roomResourceId;
       var roomA;
       var roomB;

       before(function (done) {
            dbQuery.preCondition.findAllServices(function (res) {
                serviceId = res[0]._id;
                dbQuery.preCondition.findAllRooms(function (res) {
                    var index = Math.floor((Math.random() * res.length))-1;
                    roomA = res[index];
                    roomB = res[index+1];
                    done();
                });
            });

       });

       it('I have a created resource', function () {
            var resourceBody = generator.generator_resource.generateResource();
            dbQuery.preCondition.insertResource(resourceBody, function (res) {
                roomResourceId = res._id;
                done();

            });
       });

       it('And I add the resource to a \'Room A\'', function () {
            var quantity = generator.generateCapacity();
            var bodyJSON = {"quantity": quantity};
            request.resource.putResourceByRoom(roomA._id, roomResourceId, bodyJSON, function (err, res) {
                var resourcesList = res.body.resources;
                var found = helper.compareResourceByResourceId(resourcesList, roomResourceId);
                expect(found.shift().quantity).to.equal(parseInt(quantity));
                done();
            });
       });

       it('And I Add the resource to a \'Room B\'', function () {
           var quantity = generator.generateCapacity();
           var bodyJSON = {"quantity": quantity};
           request.resource.putResourceByRoom(roomB._id, roomResourceId, bodyJSON, function (err, res) {
               var resourcesList = res.body.resources;
               var found = helper.compareResourceByResourceId(resourcesList, roomResourceId);
               expect(found.shift().quantity).to.equal(parseInt(quantity));
               done();
           });
       });

       it('I Delete de resource', function(){
            request.resource.delResource(roomResourceId, function(err,res){
                dbQuery.assertion.findResource(res.body._id, function(result){
                    expect(undefined).to.equal(result);
                    done();
                });
            });
       });

       it('Then the deleted resource should not be assigned into the \'room A\'', function () {
           request.resource.getResourceByRoomId(roomA._id, roomResourceId, function (err, res) {
               expect(res.body).to.empty;
               done();
           });
       });

       it('And the deleted resource should not be assigned into the \'room B\'', function () {
            request.resource.getResourceByRoomId(roomB._id, roomResourceId, function (err, res) {
                expect(res.body).to.empty;
                done();
            });
       });
   });

});
