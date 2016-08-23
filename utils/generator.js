var generateValues = function(){
    var value = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 16; i++ ) {
        value += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return value;
};
exports.generateValues = generateValues;

var generateValue = function(){
    var value = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    value += possible.charAt(Math.floor(Math.random() * possible.length));
    return value;
};
exports.generateValue = generateValue;

var buildList = function(arrayList){
    var value = [];
    for( var i=0; i < arrayList.length; i++ ) {
        value.push(arrayList[i]._id.toString());
    }
    return value;
};
exports.buildList = buildList;

var generateCapacity = function(){
    var value = "";
    var possible = "0123456789";
    for( var i=0; i < 3; i++ ) {
        value += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return value;
};
exports.generateCapacity = generateCapacity;

var generator_resource = require('../utils/generator_resource.js');
exports.generator_resource = generator_resource;

var generator_room = require('../utils/generator_room.js');
exports.generator_room = generator_room;

var generator_location = require('../utils/generator_location.js');
exports.generator_location = generator_location;

var generator_service = require('../utils/generator_service.js');
exports.generator_service = generator_service;

var generator_outOfOrder = require('../utils/generator_outOfOrder.js');
exports.generator_outOfOrder = generator_outOfOrder;

var generator_meeting = require('../utils/generator_meeting.js');
exports.generator_meeting = generator_meeting;