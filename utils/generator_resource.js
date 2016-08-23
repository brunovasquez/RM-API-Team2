var generator = require('../utils/generator.js');
var resource = {
    "resourceId":"",
    "name": "",
    "customName": "",
    "fontIcon": "fa fa-windows",
    "from": "",
    "description": "",
    "quantity" : ""
};
var listResource = {
    "id": []
};

var generateResource = function(){
    resource.name = generator.generateValues();
    resource.customName = generator.generateValues();
    resource.description = generator.generateValues();
    storeResources(resource);
    if(resource.resourceId != "")
    {resource.resourceId = "";}
    return resource;
};
exports.generateResource = generateResource;

var setPropertiesResource = function(resourceID){
    resource.resourceId = resourceID;
    resource.quantity = generator.generateCapacity();
};
exports.setPropertiesResource = setPropertiesResource;

var resources = {"associations":[]};

var storeResources= function(resource){
    resources.associations.push(resource);
};
var getResourcesList= function(){
    console.log("lista json  "+listResource);
    return listResource.id;
};
exports.getResourcesList = getResourcesList;

var getResources= function(){
    return resources;
};
exports.getResources = getResources;
