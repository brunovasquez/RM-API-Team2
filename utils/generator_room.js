var generator = require('../utils/generator.js');
var room = {
    "customDisplayName": "",
    "code": "",
    "capacity": ""
};
var generateRoomWithLocation = function(locationId){
    room.customDisplayName = generator.generateValues();
    room.code = generator.generateValues();
    room.capacity = generator.generateCapacity();
    room.locationId = locationId;
    return room;
};

var generateRoom = function(){
    room.customDisplayName = generator.generateValues();
    room.code = generator.generateValues();
    room.capacity = generator.generateCapacity();
    return room;
};
exports.generateRoom = generateRoom;
exports.generateRoomWithLocation = generateRoomWithLocation;


