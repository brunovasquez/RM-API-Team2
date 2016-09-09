# AT01-TEAM2
Configurations
---------------
- Add Status code configuration into the config.js
- Add into config.json the 'authentication' field for roomManagerCredentials
- Add Logger.js configuration to manage the Logger files
- Delete from the config.json the endpoint for /public-key

Request Manager
---------------
- Add logger into all request where the end point is called
- Modify in manager_authentication.js the "authentication", now we use the authentication from the config.js
- Add manager_serviceTypes.js to to validate the end point GET /services-types

Smoke
------
- Refactor smoke tests, replace all magic numbers
- Add PUT /services smoke test
- Delete smoke test for Get /public-keys

CRUD
----
- Refactor CRUD tests, replace all magic numbers
- Refactor crud_attendees.js, crud_outOfOrdersTest.js, crud_roomTest.js, crud_room_resourcesTest.js and
  crud_service_room_resourceTest.js - Add a helper.js to manage logic operations that is needed into the tests
- Implement ECMAScript6 standard
- Add PUT /services crud test

BDT
---
- Refactor code in bdt_impersonationTest.js - modify the value for the domain user to "Administrator"
- Add new BDTS:
    bdt_addLocationOnARoom.js
    bdt_createAnOutOfOrderOnAnotherOutOforderSchedule.js
    bdt_createMeetingImpersonationWithAttendeerAndOptionalAtendees.js
    bdt_createResourceOnDisabledRoom.js
    bdt_deleteResourceAssociatedToRoom.js
    bdt_deleteLocationAssociatedToRoom.js

Utils
-----
- Add logger.js to
- Add logger_manager.js
- Add helper.js
- Modify the generator_meeting.js - change the organizer, now we use the config.roomManagerCredentials.username
  instead of config.domainCredentials.username
- Modify the generator_room.js - Add the generateRoomWithLocation method
