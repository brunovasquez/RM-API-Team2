var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var config = require('../../config/config.json');

describe("Smoke: Service Types - Feature", function(){
    this.slow(config.timeSlow);
    this.timeout(config.timeOut);

    it('GET /service-types, returns status code 200', function(done){
        request.serviceTypes.getServiceTypes(function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });
});
