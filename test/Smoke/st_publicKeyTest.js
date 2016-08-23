var expect = require('chai').expect;
var request = require('../../lib/RequestManager/manager.js');
var generator = require('../../utils/generator.js');
var config = require('../../config/config.json');

describe("Smoke: Public Key - Feature", function(){
    this.slow(config.timeSlow);
    this.timeout(config.timeOut);

    it('GET /public key, returns status code 200', function(done){
        request.publicKey.getPublicKey(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
});
