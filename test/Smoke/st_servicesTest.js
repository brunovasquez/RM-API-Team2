var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');

describe("Smoke: Service - Feature", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var serviceId;
    var serviceIdPost;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            dbQuery.preCondition.findAllServices(function(res){
                serviceId = res[0]._id;
                done();
            });
        });
    });

    it('POST /services, returns status code 200', function(done){
        var body = config.exchange;
        var serviceType = generator.generator_service.getType();
        request.services.postService(serviceType.exchange, body, function(err, res){
            serviceIdPost = res.body._id;
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('GET /services, returns status code 200', function(done){
        request.services.getServices(function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('GET /services/{:serviceId}, returns status code 200', function(done){
        request.services.getServiceById(serviceId, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('GET /services?type={service type}, returns status code 200', function(done){
        var serviceType = generator.generator_service.getType();
        request.services.getServiceByType(serviceType.exchange, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });

    it('DEL /services/{:serviceId}, returns status code 200', function(done){
        request.services.delService(serviceIdPost, function(err, res){
            expect(res.status).to.equal(config.statusCode.OK);
            done();
        });
    });
});