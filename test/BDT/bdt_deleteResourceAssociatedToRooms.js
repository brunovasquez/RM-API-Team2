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
           request.authentication.postLogin(function(err, res) {
               dbQuery.preCondition.findAllServices(function (res) {
                   serviceId = res[0]._id;
                   dbQuery.preCondition.findAllRooms(function (res) {
                       //var index = Math.floor((Math.random() * res.length));
                       roomA = res[0];
                       roomB = res[1];

                       done();
                   });
               });
           });

       });

       it('Given I have a created resource', function (done) {
           var body = generator.generator_resource.generateResource();
           request.resource.postResource(body, function(err, res){
               roomResourceId = res.body._id;
               expect(res.status).to.equal(config.statusCode.OK);
               done();
           });
       });

       it('And I add the resource to a \'Room A\'', function (done) {
           var body = generator.generator_resource.generateResource();
           generator.generator_resource.setPropertiesResource(roomResourceId);
           request.resource.postResourceByRoomOfService(body, serviceId, roomA._id, function(err, res){
               expect(res.status).to.equal(config.statusCode.OK);
               done();
           });

       });

       it('And I Add the resource to a \'Room B\'', function (done) {
           var body = generator.generator_resource.generateResource();
           generator.generator_resource.setPropertiesResource(roomResourceId);
           request.resource.postResourceByRoomOfService(body, serviceId, roomB._id, function(err, res){
               expect(res.status).to.equal(config.statusCode.OK);
               done();
           });

       });

       it('When I Delete the resource', function(done){
            request.resource.delResource(roomResourceId, function(err,res){
                dbQuery.assertion.findResource(res.body._id, function(result){
                    expect(undefined).to.equal(result);
                    done();
                });
            });
       });

       it('Then the deleted resource should not be assigned into the \'room A\'', function (done) {
           request.resource.getResourceByRoomId(roomA._id, roomResourceId, function (err, res) {
               expect("NotFoundError").to.equal(res.body.code);
               done();
           });
       });

       it('And the deleted resource should not be assigned into the \'room B\'', function (done) {
            request.resource.getResourceByRoomId(roomB._id, roomResourceId, function (err, res) {
                expect("NotFoundError").to.equal(res.body.code)
                done();
            });
       });
   });

});
