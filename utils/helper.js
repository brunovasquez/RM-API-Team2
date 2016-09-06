/**
 * This function is used to do the corresponding validation given two list of room service
 * @param roomServiceResult room service list from the endpoint
 * @param roomsServiceListExpected Room service list from the database
 */
var compareRoomService = function(roomServiceResult, roomsServiceListExpected){
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
exports.compareRoomService = compareRoomService;