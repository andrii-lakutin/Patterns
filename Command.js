var carManager = {

  requestInfo: function( model, id ){
    console.log('1');
    return "The information for " + model + " with ID " + id + " is foobar";
  },

  buyVehicle: function( model, id ){
    return "You have successfully purchased Item " + id + ", a " + model;
  },

  arrangeViewing: function( model, id ){
    return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
  }

};

//Commands handler
carManager.execute = function ( name ) {
    return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
};

carManager.execute( "arrangeViewing", "Ferrari", "14523" );
carManager.execute( "requestInfo", "Ford Mondeo", "54323" );
carManager.execute( "requestInfo", "Ford Escort", "34232" );
carManager.execute( "buyVehicle", "Ford Escort", "34232" );