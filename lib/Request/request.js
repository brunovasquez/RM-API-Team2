var request = require('../../node_modules/superagent');
var config = require('../../config/config.json');
var headers = require('../../config/headers.json');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

/**
 * this function receive the begin of (superagent)request and if this request have,
 * authentication set it and finished the request. It finished get and del requests.
 * @param req {superagent}
 * @param dataRequest {json}
 * @param callback {function}
 */
var finishRequestGetDel = function(req, dataRequest, callback){

    if(dataRequest.Authorization !== undefined){
        if(dataRequest.Authorization === "Basic"){
            req = req
                .auth(config.domainCredentials.username, config.domainCredentials.password);
        }else{
            req = req.set(headers.get.Authorization.name, dataRequest.Authorization);
        }
    }
    req
        .end(function(err,res){
            callback(err, res);
        });
};

/**
 * this function receive the begin of (superagent)request and if this request have,
 * authentication set it and finished the request. It finished post and put requests.
 * @param req {superagent}
 * @param dataRequest {json}
 * @param callback {function}
 */
var finishRequestPostPut = function(req, dataRequest, callback){
        req = req
            .set(headers.get.ContentType.name, headers.get.ContentType.value);
        if(dataRequest.Authorization !== ""){
            if(dataRequest.Authorization === "Basic"){
                req = req
                    .auth(config.domainCredentials.username, config.domainCredentials.password);
            }else{
                req = req
                    .set(headers.get.Authorization.name, dataRequest.Authorization);
            }
        }
        req
        .send(dataRequest.body)
        .end(function(err,res){
            callback(err, res);
        });
};

/**
 * This function is to assign authorization token to dataRequest json.
 * @param dataRequest {json}
 * @returns {json}
 */
var setAuthorization = function(dataRequest){
    var auth = dataRequest.Authorization;
    if(auth === "jwt ") {
        auth = headers.get.Authorization.jwt;
    }
    dataRequest.Authorization = auth;

    return dataRequest;
};


/**
 * this function is to choose the type of request and this build the begin of request,
 * according to method invoke finishRequestPostPut and finishRequestGetDel function in order
 * to finish the request.
 * @param type {string}
 * @param endPoint {string}
 * @param dataRequest {string} it is optional
 * @param callback {string}
 */
var buildRequest = function(type, endPoint, dataRequest, callback){
    var req;
    if(arguments.length === 3){
        var callback = arguments[2];
        var dataRequest = {};
    }else{
        dataRequest = setAuthorization(dataRequest);
    }

    switch(type){
        case "post":
            req = request.post(endPoint);
            finishRequestPostPut(req, dataRequest, callback);
            break;
        case "put":
            req = request.put(endPoint);
            finishRequestPostPut(req, dataRequest, callback);
            break;
        case "get":
            req = request.get(endPoint);
            finishRequestGetDel(req, dataRequest, callback);

            break;
        case "del":
            req = request.del(endPoint);
            finishRequestGetDel(req, dataRequest, callback);
            break;
    }

};
exports.buildRequest = buildRequest;
