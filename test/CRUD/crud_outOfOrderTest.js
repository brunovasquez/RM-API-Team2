var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD - Out of Orders - Feature without creating out of order like precondition", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = null,serviceId = null;
    var outOfOrderId = null, totalOutOfOrders = 0;
    var outOfOrderBody = null;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                dbQuery.preCondition.findAllRoomsOfOneService(serviceId, function(res){
                    room_ID = res[0]._id;
                done();
                });
            });
        });
    });

    afterEach(function(done){
        dbQuery.postCondition.removeOutOfOrder(outOfOrderId,function(res){
            done();
        });
    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/out-of-orders creates one out of order on one specific Room and Service', function(done){
        var complementUrl = "?active=true&email=true";
        var outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(room_ID);
        request.outOfOrders.postOutOfOrder(serviceId, room_ID, outOfOrderBody, complementUrl,function(err, res){
            var actualResult = res.body;
            expect(actualResult.roomId).to.equal(room_ID.toString());
            done();

        });
    });
    describe("CRUD - Out Of Order - Feature creating out of order like precondition", function(){
        beforeEach(function(done){
            //Creating a out-of-Order by DB  - without meeting -
            outOfOrderBody = generator.generator_outOfOrder.generateOutOfOrder(room_ID);
            dbQuery.preCondition.insertOutOfOrder(outOfOrderBody,function(res){
                //Updating the new object
                outOfOrderId = res._id;
                generator.generator_outOfOrder.updateId(outOfOrderId);
                outOfOrderBody = generator.generator_outOfOrder.outOfOrder;
                done();
            });
        });


        it('GET /out-of-orders returns all out of orders', function(done){
            request.outOfOrders.getOutOfOrders(function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findAllOutOfOrders(function(resultExpected){
                    var totalPresents = 0, present;

                    actualResult.forEach(function(element){
                        present = false;
                        resultExpected.forEach(function(dbElement){
                            var from = new Date(dbElement.from);
                            if (element._id == dbElement._id &&
                                element.roomId == dbElement.roomId &&
                                element.title == dbElement.title &&
                                element.from == from.toISOString()){
                                present = true;
                            }
                        });
                        if (present){
                            totalPresents ++;
                        }
                    });
                    expect(actualResult.length).to.equal(resultExpected.length);
                    expect(totalPresents).to.equal(resultExpected.length);
                    done();
                });
            });
        });

        it('GET /out-of-orders/{:out-of-orderId} returns one specific out of order', function(done){
            request.outOfOrders.getOutOfOrderById(outOfOrderId, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findOutOfOrderById(outOfOrderId,function(resultExpected){
                    var from = new Date(resultExpected.from);
                    var to = new Date(resultExpected.to);
                    expect(actualResult._id == resultExpected._id).to.equal(true);
                    expect(actualResult.roomId == resultExpected.roomId).to.equal(true);
                    expect(actualResult.title == resultExpected.title).to.equal(true);
                    expect(actualResult.from == from.toISOString()).to.equal(true);
                    expect(actualResult.to == to.toISOString()).to.equal(true);

                    done();
                });
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns all out of orders by specific Room and Service', function(done){
            request.outOfOrders.getOutOfOrderByRoom(serviceId, room_ID, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findAllOutOfOrdersByRoom(room_ID,function(resultExpected){
                    var totalPresents = 0, present;
                    actualResult.forEach(function(element){
                        present = false;
                        resultExpected.forEach(function(dbElement){
                            var from = new Date(dbElement.from);
                            if (element._id == dbElement._id &&
                                element.roomId == dbElement.roomId &&
                                element.title == dbElement.title &&
                                element.from == from.toISOString()){
                                present = true;
                            }
                        });
                        if (present){
                            totalPresents ++;
                        }
                    });
                    expect(actualResult.length).to.equal(resultExpected.length);
                    expect(totalPresents).to.equal(resultExpected.length);
                    done();
                });
            });
        });

        it('GET /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns one out of order by specific Room and Service', function(done){
            request.outOfOrders.getOutOfOrderByRoom(serviceId, room_ID, outOfOrderId, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findOutOfOrderById(outOfOrderId,function(resultExpected){
                    var from = new Date(resultExpected.from);
                    var to = new Date(resultExpected.to);
                    expect(actualResult._id == resultExpected._id).to.equal(true);
                    expect(actualResult.roomId == resultExpected.roomId).to.equal(true);
                    expect(actualResult.title == resultExpected.title).to.equal(true);
                    expect(actualResult.from == from.toISOString()).to.equal(true);
                    expect(actualResult.to == to.toISOString()).to.equal(true);

                    done();
                });
            });
        });



        it('PUT /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} updates one out of order by specific Room and Service', function(done){
            var complementUrl = "?active=true&email=true";
            var outOfOrderBody = {"title": "OutOfOrder Edited"};
            request.outOfOrders.putOutOfOrder(serviceId, room_ID, outOfOrderId, outOfOrderBody, complementUrl, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findOutOfOrderById(outOfOrderId,function(resultExpected){
                    var from = new Date(resultExpected.from);
                    var to = new Date(resultExpected.to);
                    expect(actualResult._id == resultExpected._id).to.equal(true);
                    expect(actualResult.roomId == resultExpected.roomId).to.equal(true);
                    expect(actualResult.title == outOfOrderBody.title).to.equal(true);
                    expect(actualResult.from == from.toISOString()).to.equal(true);
                    expect(actualResult.to == to.toISOString()).to.equal(true);
                    done();
                });
            });
        });

        it('DEL /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} deletes one out of order by specific Room and Service', function(done){
            request.outOfOrders.delOutOfOrder(serviceId, room_ID, outOfOrderId, function(err, res){
                dbQuery.assertion.findOutOfOrderById(outOfOrderId,function(resultExpected){
                    expect(resultExpected).to.equal(undefined);
                    outOfOrderId = null;
                    done();
                });
            });
        });

        afterEach(function(done){
            if(outOfOrderId){
                dbQuery.postCondition.removeOutOfOrder(outOfOrderId,function(res){
                    done();
                });
            }
            else{
                done();
            }
        });
    });
});
