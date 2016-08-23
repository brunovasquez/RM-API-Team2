var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Smoke: Room Resources - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var serviceId;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                done();
            });
        });
    });

    it('GET /services/{:serviceId}/attendees{?filter}/, returns status code 200', function(done){
        var filter = generator.generateValue();
        request.services.getAttendeesByService(serviceId, filter, function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
});
