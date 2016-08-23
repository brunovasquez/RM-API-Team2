var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Smoke: Locations  - Feature", function(){
    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var bodyLocation;
    var locationID;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        bodyLocation = generator.generator_location.generateLocation();
        dbQuery.preCondition.insertLocation(bodyLocation, function(result){
            locationID = result._id;
                done();
            });
    });

    afterEach(function(done){
        if (locationID !== undefined) {
            dbQuery.removeLocation( locationID, function(){
                done();
            });
        }
    });

    it('POST /locations, returns status code 200', function(done){
        bodyLocation = generator.generator_location.generateLocation();
        request.location.postLocation(bodyLocation, function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('POST /locations, returns status code 401 when an incorrect authorization is used', function(done){
        bodyLocation = generator.generator_location.generateLocation();
        request.location.postLocationIncorrectAuthorization(bodyLocation, function(err, res){
            expect(res.status).to.equal(401);
            done();
        });
    });

    it('GET /locations, returns status code 200', function(done){
        request.location.getLocations(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /locations/{:locationId }, returns status code 200', function(done){
        request.location.getLocationById(locationID, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('GET /locations/{:locationId }, returns status code 404 when a non-existent location Id is used', function(done){
        var nonExistentLocationID = generator.generateValues();
        request.location.getLocationById(nonExistentLocationID, function(err, res){
            expect(res.status).to.equal(404);
            done();
        });
    });

    it('PUT /A specific location, returns status code 200', function(done){
        var body = generator.generator_location.generateLocation();
        request.location.putLocation(locationID, body, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DEL /A specific location, returns status code 200', function(done){
        request.location.delLocation(locationID, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('DEL /A specific location, returns 404 status code when a non-existent location is used', function(done){
        var nonExistentLocationID = generator.generateValues();
        request.location.delLocation(nonExistentLocationID, function(err, res){
            expect(res.status).to.equal(404);
            done();
        });
    });

});
