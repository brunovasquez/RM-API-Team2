var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD - Room Resources Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var serviceId = null, room_ID = null, room_ID2 = null;
    var roomResourceId = null, totalResources = 0;
    var resourceBody = null;
    var resourceList = null;
    var resourceJSON = null;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                dbQuery.preCondition.findAllRoomsOfOneService(serviceId, function(res){
                    room_ID = res[0]._id;
                    room_ID2 = res[1]._id;
                    done();
                });
            });
        });
    });

    beforeEach(function(done){
        /*Create a resource*/
        resourceBody = generator.generator_resource.generateResource();
        dbQuery.preCondition.insertResource(resourceBody,function(res){
            roomResourceId = res._id;
            generator.generator_resource.setPropertiesResource(roomResourceId);
            //Adding the resource to room
            dbQuery.preCondition.addResourceToRoom(room_ID,resourceBody,function(err, res){
                //Bring the Room Resources list
                dbQuery.preCondition.findRoom(room_ID,function(res){
                    totalResources = res.resources.length;
                    resourceList = res.resources;
                    done();
                });
            });
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/resources returns all resources by room and service Id', function(done){
        request.resource.getResourcesByRoomOfService(serviceId,room_ID, function(err, res){
            var present, amountPresents = 0;
            expect(totalResources).to.equal(res.body.length);
            //All elements should be present
            res.body.forEach(function(element){
                present = false;
                resourceList.forEach(function(dbElement){
                    if (element.resourceId == dbElement.resourceId && element.quantity == dbElement.quantity){
                        present = true;
                    }
                });
                if (present){
                    amountPresents ++;
                }
                expect(totalResources).to.equal(amountPresents);
            });
            done();
        });
    });

    it('GET /services/{:serviceId}/rooms/{:roomId}/resources/{:roomResourceId} returns a specific resource by room and service Id', function(done){
      request.resource.getResourceByRoomOfService(serviceId, room_ID, roomResourceId, function(err, res){
            expect(resourceBody.resourceId == res.body.resourceId).to.equal(true);
            expect(resourceBody.quantity == res.body.quantity).to.equal(true);
            done();
        });
    });

    it('PUT /services/{:serviceId}/rooms/{:roomId}/resources/{:roomResourceId} updates a specific resource from a specific room', function(done){
        var quantity = generator.generateCapacity();
        var bodyJSON = {"quantity": quantity};
        var found = false;
        request.resource.putResourceByRoomOfService(serviceId, room_ID, roomResourceId, bodyJSON, function(err, res){
            var resourcesList = res.body.resources;
            //All elements should be present
            resourcesList.forEach(function(elementResource){
                if (elementResource._id == roomResourceId){
                    found = true;
                    expect(elementResource.quantity).to.equal(parseInt(quantity));
                }
            });
            expect(found).to.equal(true);
            done();
        });
    });

    it('DEL /rooms/{:roomId}/resources/{:roomResourceId} removes a specific resource from a specific room', function(done){
        var found = false;
        request.resource.delResourceByRoomOfService(serviceId, room_ID, roomResourceId, function(err, res){
            var resourcesList = res.body.resources;
            resourcesList.forEach(function(elementResource){
                if (elementResource._id == roomResourceId){
                    found=true;
                }
            });
            expect(found).to.equal(false);
            done();
        });
    });

    it('POST /rooms/{:roomId}/resources associates a resource to a room', function(done){
        var found = false;
        generator.generator_resource.setPropertiesResource(roomResourceId);
        resourceJSON = generator.generator_resource.getResources();
        console.log('expIdres',resourceJSON);
        request.resource.postResourceByRoomOfService(resourceJSON, serviceId, room_ID2, function(err, res){
            var resourcesList = res.body.resources;
            (resourcesList instanceof Array)? found = false : resourcesList = [];
            resourcesList.forEach(function(elementResource){
                if (elementResource.resourceId == roomResourceId){
                    found = true;
                }
            });
            expect(found).to.equal(true);
            done();
        });

    });

    afterEach(function(done){
        if(roomResourceId) {
            dbQuery.postCondition.removeResourceToRoom(room_ID, roomResourceId, function (re) {
                dbQuery.postCondition.removeResource(roomResourceId, function (res) {
                    done();
                });
            });
        }
        else{
            done();
        }
    });
    after(function(done){
        dbQuery.postCondition.removeResourceToRoom(room_ID2, roomResourceId, function (err,res) {
            done();
        });
    });
});