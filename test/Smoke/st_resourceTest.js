var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Smoke: Resource - Feature", function(){
    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var resourceId;
    var room_ID;
    var room_ID2;
    var serviceId;
    var listResources = [];

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        var body = generator.generator_resource.generateResource();
        dbQuery.preCondition.insertResource(body, function(result){
                resourceId = result._id;
                generator.generator_resource.setPropertiesResource(resourceId);
                dbQuery.preCondition.findAllRooms(function(res){
                    room_ID = res[0]._id;
                    room_ID2 = res[1]._id;
                    dbQuery.preCondition.findAllServices(function(res){
                        serviceId = res[0]._id;
                        dbQuery.preCondition.findAllResources(function(res){
                            listResources = res;
                            done();
                        });
                    });
                });
        });
    });

    afterEach(function(done){
        if (resourceId !== undefined) {
            dbQuery.removeResource( resourceId, function(){
                done();
            });
        }
    });

    it('POST /resources, returns status code 200', function(done){
        var body = generator.generator_resource.generateResource();
        request.resource.postResource(body, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('POST /services/{:serviceId}/rooms/{:roomId}/resources, returns status code 200', function(done){
        var body = generator.generator_resource.generateResource();
        generator.generator_resource.setPropertiesResource(resourceId);
        console.log(body);
        request.resource.postResourceByRoomOfService(body, serviceId, room_ID, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('POST /rooms/{:roomId}/resources, returns status code 200', function(done){
         var resourceBody = generator.generator_resource.generateResource();
         generator.generator_resource.setPropertiesResource(resourceId);
         request.resource.postResourceByRoomId(resourceBody, room_ID2, function(err, res){
             expect(res.status).to.equal(config.statusCode.OK);
             done();
         });
     });

    it('POST /rooms/{:roomId}/resources, returns 404 status code when a non-existent roomId is used.', function(done){
        var nonExistentRoomId = generator.generateValues();
        var resourceBody = generator.generator_resource.generateResource();
        request.resource.postResourceByRoomId(resourceBody, nonExistentRoomId, function(err, res){
            expect(res.status).to.equal(config.statusCode.NOT_FOUND);
            done();
        });
    });

     it('GET /rooms/{:roomId}/resources, returns status code 200', function(done){
         request.resource.getResourcesByRoom(room_ID, function(err, res){
             expect(res.status).to.equal(config.statusCode.OK);
             done();
         });
     });

    it('GET /resources, returns status code 200', function(done){
        request.resource.getResources(function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('GET /resources/{:id}, returns status code 200', function(done){
        request.resource.getResourceById(resourceId, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('GET /resources/{:id}, returns status code 404 when a non-existent resourceId is used', function(done){
        request.resource.getResourceById(generator.generateValues(), function(err, res){
            expect(res.status).to.equal(config.statusCode.NOT_FOUND);
            done();
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/resources, returns status code 200', function(done){
        request.resource.getResourcesByRoomOfService(serviceId, room_ID, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('PUT /resources/{:id}, returns status code 200', function(done){
        var body = generator.generator_resource.generateResource();
        request.resource.putResource(resourceId, body, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('PUT /resources/{:id}, returns status code 404 when a non-existent resourceId is used', function(done){
        var body = generator.generator_resource.generateResource();
        request.resource.putResource(generator.generateValues(), body, function(err, res){
            expect(res.status).to.equal(config.statusCode.NOT_FOUND);
            done();
        });
    });

    it('DEL /resources/{:id}, returns status code 200', function(done){
        request.resource.delResource(resourceId, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('DEL /resources, returns status code 200', function(done){
        listResources = generator.buildList(listResources);
        var id = listResources[0];
        request.resource.delResources(id, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('DEL /resources/{:id}, returns status code 404 when a non-existent resourceId is used', function(done){
        request.resource.delResource(generator.generateValues(), function(err, res){
            expect(res.status).to.equal(config.statusCode.NOT_FOUND);
            done();
        });
    });

});