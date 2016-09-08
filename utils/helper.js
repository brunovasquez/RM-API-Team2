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


exports.compareRoomService = compareRoomService;

/**
 * This function is used to do the corresponding validation given two list of resources from a room
 * @param resourcesListResponse resources list from the endpoint
 * @param resourceListBdD resources list from the database
 */
var compareResources = function (resourcesListResponse, resourceListBdD) {
    var amountPresents = 0;
    resourcesListResponse.forEach(element =>{
        amountPresents +=
            resourceListBdD.filter(dbElement =>
            element.resourceId == dbElement.resourceId && element.quantity == dbElement.quantity).length;
    });
    return amountPresents;
};
exports.compareResources = compareResources;

/**
 * This function is used to find the resource that have an specific Id
 * @param resourcesList Is the list where is going to fin coincidences
 * @param roomResourceId I the Id for compare
 * @returns {Array|Cursor|*|Array.<T>|{_id}|{PSEUDO, CHILD, ID, TAG, CLASS, ATTR, POS}}
 * The list of all elements that have coincidences with the id sent
 */
var compareResourceById = function (resourcesList, roomResourceId) {
    return resourcesList.filter(elementResource =>
    elementResource._id == roomResourceId);
};
exports.compareResourceById = compareResourceById;


/**
 * This function is used to find the resource that have an specific resourceId
 * @param resourcesList Is the list where is going to fin coincidences
 * @param roomResourceId I the resourceId for compare
 * @returns {Array|Cursor|*|Array.<T>|{_id}|{PSEUDO, CHILD, ID, TAG, CLASS, ATTR, POS}}
 * The list of all elements that have coincidences with the resourceId sent
 */
var compareResourceByResourceId = function (resourcesList, roomResourceId) {
    return resourcesList.filter(elementResource =>
    elementResource.resourceId == roomResourceId);
};
exports.compareResourceByResourceId = compareResourceByResourceId;


/**
 * This function is used to count of the attended for account
 * @param accountListExpected Is the list to compare
 * @param accountListActual Is the list to compare
 * @returns totalPresent is the total coincidences
 */
var countTotalPresentAttendAndService = function (accountListExpected, accountListActual) {
    var totalPresent = 0;
    accountListActual.forEach(accountActual => totalPresent = accountListExpected.filter(accountExpected => accountExpected.dn == accountActual.dn).length
    );
    return totalPresent;
};
exports.countTotalPresentAttendAndService = countTotalPresentAttendAndService;



