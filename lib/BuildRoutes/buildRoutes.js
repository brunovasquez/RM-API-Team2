var config = require('../../config/config.json');
var rootURI = config.rootURI + ":" + config.port;

var buildRoute = function(endPoint, prefix, suffix, id){

    if(id !== undefined) {
        endPoint = endPoint + "/" + id;
    }

    var prefixString = "";

    prefix.forEach(function(item){
        prefixString = prefixString + item.address;
        if(item.id !== undefined){
            prefixString = prefixString +"/" + item.id;
        }
    });

    var suffixString = "";

    suffix.forEach(function(item){
        suffixString = suffixString + item.address;
        if(item.id !== undefined){
            suffixString = suffixString +"/" + item.id;
        }
    });

    return rootURI + prefixString + endPoint + suffixString;
};
exports.buildRoute = buildRoute;