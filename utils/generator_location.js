var generator = require('../utils/generator.js');
var location = {
    "name":"",
    "customName":"",
    "description":"",
    "parentId":"",
    "roomIds":[]
};
var generateLocation = function(){
    location.name = generator.generateValues();
    location.customName = generator.generateValues();
    location.description = generator.generateValues();
    return location;
};
exports.generateLocation = generateLocation;

var setParentId = function(bodyLocation, parentID){
    return bodyLocation.parentId = parentID;
};
exports.setParentId = setParentId;
