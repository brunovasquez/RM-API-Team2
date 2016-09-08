/**
 * Created by AlvaroDaza on 9/8/2016.
 */
var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');
var helper = require('../../utils/helper.js');

describe('Feature: Out Of Order API', function () {
    context('Scenario: Create an out of order on another out of order', function () {
        var room;
        var roomId;
        var expectedStatusCodeOfRequestOrder;
        var outOfOrderId;
        var secondOutOfOrderId;
        this.slow(config.timeSlow);
        this.timeout(config.timeOut);

        before(function (done) {
            request.authentication.postLogin(function (err, res) {
                done();
            });
        });
        it('Given a have a room', function (done) {
            dbQuery.preCondition.findAllRooms(function (res) {
                room = res.body;
                roomId = res[0]._id;
                done();
            });
        });
        it('And I have a Service', function (done) {
            dbQuery.preCondition.findAllServices(function (res) {
                serviceId = res[0]._id;
                done();
            });
        });
        it('And I create Out of Order', function (done) {
            var complementUrl = "?active=true&email=true";
            var outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(roomId);
            request.outOfOrders.postOutOfOrder(serviceId, roomId, outOfOrderBody, complementUrl, function (err, res) {
                outOfOrderId = res.body._id;
                startDate = outOfOrderBody.from;
                endDate = outOfOrderBody.to;
                done();
            });
        });
        it('When I create another  Out of Order on the other Out Of order schedule ', function (done) {
            var complementUrl = "?active=true&email=true";
            var outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(roomId);
            outOfOrderBody.start = startDate;
            outOfOrderBody.end = endDate;
            request.outOfOrders.postOutOfOrder(serviceId, roomId, outOfOrderBody, complementUrl, function (err, res) {
                secondOutOfOrderId = res.body._id;
                expectedStatusCodeOfRequestOrder = res.statusCode;
                done();
            });
        });
        it('Then the second out Of Order is not rejected', function (done) {
            expect(expectedStatusCodeOfRequestOrder).to.equal(config.statusCode.OK);
            done();
        });
        after(function (done) {
            request.outOfOrders.delOutOfOrder(serviceId, roomId, outOfOrderId, function (err, res) {
                if (outOfOrderId !== undefined) {
                    request.outOfOrders.delOutOfOrder(serviceId, roomId, secondOutOfOrderId, function (err, res) {
                        done();
                    });
                } else {
                    done();
                }
            });
        });
    });
});