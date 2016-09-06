compareRoomService = function(roomServiceResult, roomsServiceListExpected){
    var totalFound = 0;
    roomServiceResult.forEach(elementNow =>
    {totalFound += roomsServiceListExpected.filter(elementExpect =>
    elementNow._id == elementExpect._id &&
    elementNow.emailAddress == elementExpect.emailAddress &&
    elementNow.displayName == elementExpect.displayName &&
    elementNow.serviceId == elementExpect.serviceId).length
    });
    return totalFound;
}
exports.compareArrays = compareArryas;