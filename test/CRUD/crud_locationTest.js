var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe('CRUD: methods for API-Locations', function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var locationId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    afterEach(function(done){
        if (locationId !== undefined) {
            dbQuery.removeLocation( locationId, function(){
                done();
            }); 
        };
    });

    it('POST /locations creates a new location', function(done){
        var randomLocation = generator.generator_location.generateLocation();
        request.location.postLocation(randomLocation, function(err, res){
            var actualResult = res.body;
            locationId = res.body._id;
            dbQuery.assertion.verifyLocationExist(res.body._id, function(result){
                expect(result.customName).to.equal(actualResult.customName);
                expect(result.name).to.equal(actualResult.name);
                expect(result.fontIcon).to.equal(actualResult.fontIcon);
                done();
            });
        });
    });

    describe('', function(){

        beforeEach(function(done){
            var randomLocation = generator.generator_location.generateLocation();
            dbQuery.preCondition.insertLocation(randomLocation, function(result){
                locationId = result._id;
                done();
            });
        });

        it('GET /locations/{:Id} returns the location specified', function(done){
            request.location.getLocationById(locationId, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.verifyLocationExist(res.body._id, function(result){
                    expect(result.customName).to.equal(actualResult.customName);
                    expect(result.name).to.equal(actualResult.name);
                    expect(result.fontIcon).to.equal(actualResult.fontIcon);
                    done();
                });
            }); 
        });

        it('GET /locations returns all locations', function(done){
            request.location.getLocations(function(err, res){
                var actualResult = res.body.length;
                dbQuery.assertion.verifyAllLocations(function(result){
                    expect(result.length).to.equal(actualResult);
                    done();
                });
            }); 
        });

        it('PUT /locations/{:id} modifies the location specified', function(done){
            var randomLocation = generator.generator_location.generateLocation();
            request.location.putLocation(locationId, randomLocation, function(err, res){
                var actualResult = res.body;
                dbQuery.assertion.verifyLocationExist(res.body._id, function(result){
                    expect(result.customName).to.equal(actualResult.customName);
                    expect(result.name).to.equal(actualResult.name);
                    expect(result.fontIcon).to.equal(actualResult.fontIcon);
                    done();
                });
            }); 
        });

        it('DELETE /locations/{:Id} delete the location specified',function(done){
            request.location.delLocation(locationId, function(err,res){
            dbQuery.assertion.verifyLocationExist(res.body._id, function(result){
                    expect(undefined).to.equal(result);
                    done();
                });
            });
        });
    });
});
