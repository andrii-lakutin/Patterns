var mySingleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }
 
    var privateVariable = "Im also private";
 
    var privateRandomNumber = Math.random();
 
    return {
 
      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
 
      publicProperty: "I am also public",
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  };
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() );


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Singleton (extended) ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var GoFQuote = "When the sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code.";

var myExtSingleton = (function (GoFQuote) {
  // Instance stores a reference to the Singleton
  var instance;

  function isFoo () {
    return !!GoFQuote;
  }
 
  function BasicSingleton() {
    var privateRandomNumber = Math.random();
    return {
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  };

  function CustomSingleton() {
    var privateRandomNumber = Math.random();
    return {
      getRandomNumber: function() {
        return privateRandomNumber;
      },
      extendedMethod: function () {
        return GoFQuote;
      }
    };
  };
 
  return {
    getInstance: function () {
      if ( !instance ) {
        if ( isFoo(GoFQuote) ) {
           instance = new CustomSingleton();
        } else {
           instance = new BasicSingleton();
        }
      }
      return instance;
    }
 
  };
 
})(GoFQuote);

var singleA = myExtSingleton.getInstance();
var singleB = myExtSingleton.getInstance();

console.log( singleA );
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() );
console.log( singleA.extendedMethod() );