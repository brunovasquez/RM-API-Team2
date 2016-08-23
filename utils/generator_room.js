var generator = require('../utils/generator.js');
var room = {
    "customDisplayName": "",
    "code": "",
    "capacity": ""
};
var generateRoom = function(){
    room.customDisplayName = generator.generateValues();
    room.code = generator.generateValues();
    room.capacity = generator.generateCapacity();
    return room;
};
exports.generateRoom = generateRoom;


