var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var config = require('../../config/config.json');
var dbQuery = require('../../lib/Conditions/dbQuery.js');

describe("Out Of Order - Feature without creating out of order like precondition", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var roomId;
    var serviceId;
    var outOfOrderId;
    var flagDeleted = false;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllRooms(function(res){
                roomId = res[0]._id;
                dbQuery.preCondition.findAllServices(function(res){
                    serviceId = res[0]._id;
                    done();
                });
            });
        });
    });

    afterEach(function(done){
        if(flagDeleted === false){
            request.outOfOrders.delOutOfOrder(serviceId, roomId, outOfOrderId, function(err, res){
                done();
            });
        }else{
            done();
        }

    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/out-of-orders, returns status code 200', function(done){
        var complementUrl = "?active=true&email=true";
        var outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(roomId);
            request.outOfOrders.postOutOfOrder(serviceId, roomId, outOfOrderBody, complementUrl, function(err, res){
            outOfOrderId = res.body._id;
                expect(res.status).to.equal(200);
            done();
        });
    });

    describe("Out Of Order - Feature creating out of order like precondition", function(){
        beforeEach(function(done){
            var complementUrl = "?active=true&email=true";
            var outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(roomId);
            request.outOfOrders.postOutOfOrder(serviceId, roomId, outOfOrderBody, complementUrl, function(err, res){
                outOfOrderId = res.body._id;
                done();
            });
        });

        it('GET /out-of-orders/{:outOfOrderId}, returns status code 200', function(done){
            request.outOfOrders.getOutOfOrderById(outOfOrderId, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders, returns status code 200', function(done){
            request.outOfOrders.getOutOfOrderByRoom(serviceId, roomId, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId}, returns status code 200', function(done){
            request.outOfOrders.getOutOfOrderByRoom(serviceId, roomId, outOfOrderId, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('PUT /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId}, returns status code 200', function(done){
            var complementUrl = "?active=true&email=true";
            var outOfOrderBody = {"title": "OutOfOrder Edited"};
            request.outOfOrders.putOutOfOrder(serviceId, roomId, outOfOrderId, outOfOrderBody, complementUrl, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('DEL /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId}, returns status code 200', function(done){
            request.outOfOrders.delOutOfOrder(serviceId, roomId, outOfOrderId, function(err, res){
                expect(res.status).to.equal(200);
                flagDeleted = true;
                done();
            });
        });
    });
});