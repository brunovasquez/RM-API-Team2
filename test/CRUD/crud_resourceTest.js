var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe('CRUD: methods for API-Resources', function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);

    var resourceId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    }); 

    afterEach(function(done){
        if (resourceId !== undefined) {
            dbQuery.removeResource( resourceId, function(){
                done();
            }); 
        }
    });

    it('POST /resources create a new resource', function(done){
        var randomResource = generator.generator_resource.generateResource();
        request.resource.postResource(randomResource, function(err, res){
            var actualResult = res.body;
            resourceId = res.body._id;
            dbQuery.assertion.findResource(res.body._id, function(result){
                expect(result.customName).to.equal(actualResult.customName);
                expect(result.name).to.equal(actualResult.name);
                expect(result.fontIcon).to.equal(actualResult.fontIcon);
                done();
            });
        });
    });

    describe('', function(){

        beforeEach(function(done){
            var randomResource = generator.generator_resource.generateResource();
            dbQuery.preCondition.insertResource(randomResource, function(result){
            resourceId = result._id;
                done();
            });
        });

        it('GET /resources/{:Id} returns the resource specified', function(done){
            request.resource.getResourceById(resourceId, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findResource(res.body._id, function(result){
                    expect(result.customName).to.equal(actualResult.customName);
                    expect(result.name).to.equal(actualResult.name);
                    expect(result.fontIcon).to.equal(actualResult.fontIcon);
                    done();
                });
            }); 
        });

        it('GET /resources returns all resources', function(done){
            request.resource.getResources(function(err, res){
                var actualResult = res.body.length;
                dbQuery.assertion.findAllResources(function(result){
                    expect(result.length).to.equal(actualResult);
                    done();
                });
            }); 
        });

        it('PUT /resources/{:id} modifies the resource specified', function(done){
            var randomResource = generator.generator_resource.generateResource();
            request.resource.putResource(resourceId, randomResource, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.findResource(res.body._id, function(result){
                    expect(result.customName).to.equal(actualResult.customName);
                    expect(result.name).to.equal(actualResult.name);
                    expect(result.fontIcon).to.equal(actualResult.fontIcon);
                    done();
                });
            }); 
        });

        it('DELETE /resources/{:Id} delete the resource specified',function(done){
             request.resource.delResource(resourceId, function(err,res){
                dbQuery.assertion.findResource(res.body._id, function(result){
                   expect(undefined).to.equal(result);
                   done();
                });
            });
        });
    });  
});
