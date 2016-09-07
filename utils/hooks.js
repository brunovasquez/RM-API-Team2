var generator = require('./generator.js');
var dbQuery = require('../lib/Conditions/dbQuery.js');
exports.Hook = {
  hooks: [],
 
  insertResource: function ( name, callback ) {
    dbQuery.preCondition.insertResource(body, function(resu){
                resourceId = result._id;
    if( 'undefined' == typeof( Hook.hooks[name] ) )
      Hook.hooks[name] = []
    Hook.hooks[name].push( callback )
  },
 
  call: function ( name, arguments ) {
    if( 'undefined' != typeof( Hook.hooks[name] ) )
      for( i = 0; i < Hook.hooks[name].length; ++i )
        if( true != Hook.hooks[name][i]( arguments ) ) { break; }
  }
}

 var body = generator.generator_resource.generateResource();
        dbQuery.preCondition.insertResource(body, function(result){
                resourceId = result._id;
                generator.generator_resource.setPropertiesResource(resourceId);
                dbQuery.preCondition.findAllRooms(function(res){
                    room_ID = res[0]._id;
                    room_ID2 = res[1]._id;
                    dbQuery.preCondition.findAllServices(function(res){
                        serviceId = res[0]._id;
                        dbQuery.preCondition.findAllResources(function(res){
                            listResources = res;
                            done();
                        });
                    });
                });
        });

