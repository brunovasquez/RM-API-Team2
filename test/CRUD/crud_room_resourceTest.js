var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("CRUD - Room Resources Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var room_ID = null, room_ID2 = null;
    var roomResourceId = null, totalResources = 0;
    var resourceBody = null;
    var resourceList = null;
    var resourceJSON = null;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        /*Create a resource*/
        resourceBody = generator.generator_resource.generateResource();
        dbQuery.preCondition.insertResource(resourceBody,function(res){
            roomResourceId = res._id;
            generator.generator_resource.setPropertiesResource(roomResourceId);
            //Find room
            dbQuery.preCondition.findAllRooms(function(res){
                room_ID = res[0]._id;
                room_ID2 = res[1]._id;
                //Adding the resource to room
                dbQuery.preCondition.addResourceToRoom(room_ID,resourceBody,function(err, res){
                    dbQuery.preCondition.findRoom(room_ID,function(res){
                        totalResources = res.resources.length;
                        resourceList = res.resources;
                        done();
                    });
                });
            });
        });
    });

    it('GET /rooms/{:roomId}/resources returns all room\'s resources by room Id', function(done){
        request.resource.getResourcesByRoom(room_ID, function(err, res){
           /* Verify */
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

    it('GET /rooms/{:roomId}/resources/{:roomResourceId} returns a specific resource from a specific room', function(done){
      request.resource.getResourceByRoomId(room_ID,roomResourceId, function(err, res){
            expect(resourceBody.resourceId == res.body.resourceId).to.equal(true);
            expect(resourceBody.quantity == res.body.quantity).to.equal(true);
            done();
        });
    });

    it('PUT /rooms/{:roomId}/resources/{:roomResourceId} updates a specific resource from a specific room', function(done){
        var quantity = generator.generateCapacity();
        var bodyJSON = {"quantity": quantity};
        var found = false;

        request.resource.putResourceByRoom(room_ID, roomResourceId, bodyJSON, function(err, res){
            var resourcesList = res.body.resources;
            /*Verify that the resource is inside of Room*/
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
        request.resource.delResourceByRoom(room_ID, roomResourceId, function(err, res){
            var resourcesList = res.body.resources;
            (resourcesList instanceof Array)? found = false : resourcesList = [];
            var found = resourcesList.filter(elementResource => elementResource._id == roomResourceId);
            expect(found).to.be.empty;
            done();
        });
    });

    it('POST /rooms/{:roomId}/resources associates a resource to a room', function(done){
        var found = false;
        generator.generator_resource.setPropertiesResource(roomResourceId);
        resourceJSON = generator.generator_resource.getResources();
        request.resource.postResourceByRoomId(resourceJSON, room_ID2,function(err, res){
            var resourcesList = res.body;
            (resourcesList instanceof Array)? found = false : resourcesList = [];
            resourcesList.forEach(function(elementResource){
                if (elementResource.resourceId == roomResourceId && elementResource.quantity.to.equal(parseInt(resourceJSON.quantity))){
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