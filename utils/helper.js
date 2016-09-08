/**
 * This function is used to do the corresponding validation given two list of room service
 * @param roomServiceResult room service list from the endpoint
 * @param roomsServiceListExpected Room service list from the database
 */
var compareRoomService = function (roomServiceResult, roomsServiceListExpected) {
    var totalFound = 0;
    roomServiceResult.forEach(elementNow => {
        totalFound += roomsServiceListExpected.filter(elementExpect =>
        elementNow._id == elementExpect._id &&
        elementNow.emailAddress == elementExpect.emailAddress &&
        elementNow.displayName == elementExpect.displayName &&
        elementNow.serviceId == elementExpect.serviceId).length
    });
    return totalFound;
};
exports.compareRoomService = compareRoomService;
/**
 * This function is used to do the validation given an a requested body
 * and the function returns the quantity
 * @param actualResult request of out of orders
 * @param resultExpected  the request resultant
 * @returns {number} the quantity
 */
var compareAllOutOfOrders = function (actualResult, resultExpected) {
    var totalPresents = 0;
    actualResult.forEach(element => {
        totalPresents += resultExpected.filter(dbElement => element._id == dbElement._id &&
        element.roomId == dbElement.roomId &&
        element.title == dbElement.title &&
        element.from == new Date(dbElement.from).toISOString()).length

    });
    return totalPresents;
};
exports.compareAllOutOfOrders=compareAllOutOfOrders;