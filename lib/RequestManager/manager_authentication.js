var request = require('../Request/request.js');
var routes = require('../../lib/BuildRoutes/routes.js');
var config = require('../../config/config.json');
var method = require('../../config/method.json');
var headers = require('../../config/headers.json');
var generator = require('../../utils/generator.js');

var postLogin = function(callback){
    var endPoint = routes.authentication.URI();
    var body = {"username": config.roomManagerCredentials.username, "password": config.roomManagerCredentials.password, "authentication": config.roomManagerCredentials.authentication};
    var dataRequest = {"Authorization" : "", "body": body};
    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){
        headers.get.Authorization.jwt = config.typeAuthentication.jwt + res.body.token;
        headers.get.Authorization.basic = config.typeAuthentication.basic;
        callback(err, res);
    });
};
exports.postLogin = postLogin;

var postLoginIncorrect = function(type, callback){
    var password;
    var account;
    var endPoint =routes.authentication.URI();
    var body;
    switch(type){
        case "incorrectPassword":
            password = generator.generateValues();
            body = {"username": config.roomManagerCredentials.username, "password": password, "authentication": config.roomManagerCredentials.authentication};
            break;
        case "incorrectAccount":
            account = generator.generateValues();
            body = {"username": account, "password": config.roomManagerCredentials.password, "authentication": config.roomManagerCredentials.authentication};
            break;
        case "incorrectSyntax":
            body = {"username": "]"+config.roomManagerCredentials.username, "password": config.roomManagerCredentials.password, "authentication": config.roomManagerCredentials.authentication};
            break;
        case "missRequeriment":
            body = {"username": config.roomManagerCredentials.username, "authentication": config.roomManagerCredentials.authentication};
            break;
    }
    var dataRequest = {"Authorization" : "", "body": body};
    request.buildRequest(method.post, endPoint, dataRequest, function(err, res){

        headers.get.Authorization.jwt = config.typeAuthentication.jwt + res.body.token;
        headers.get.Authorization.basic = config.typeAuthentication.basic;
        callback(err, res);
    });
};
exports.postLoginIncorrect = postLoginIncorrect;

