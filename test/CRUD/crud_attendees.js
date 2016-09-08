var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var dbQuery = require('../../lib/Conditions/dbQuery.js');
var config = require('../../config/config.json');
var helper = require('../../utils/helper.js');

describe("CRUD - Attendees Service", function(){

    this.slow(config.timeSlow);
    this.timeout(config.timeOut);
    var serviceId = null;

    before(function(done){
        request.authentication.postLogin(function(err, res){
            done();
        });
    });

    beforeEach(function(done){
        dbQuery.preCondition.findAllServices(function(res){
            serviceId = res[0]._id;
            done();
        });
    });

    it('GET /services/{:serviceId}/attendees{?filter}/ returns a user from a specific email service', function(done){
        var filter = 'ro';
        request.services.getAttendeesByService(serviceId, filter, function(err, res){
            var accountListActual = res.body;
            dbQuery.postCondition.findAttendeesByService(serviceId,filter,function(res){
                var accountListExpected = res;
                var totalPresent = helper.countTotalPresentAttendAndService(accountListExpected, accountListActual);
         
                expect(totalPresent).to.equal(accountListExpected.length);
                expect(accountListActual.length).to.equal(accountListExpected.length);
                done();
            });
        });
    });

});
