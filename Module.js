var globalVar = 123;

var basketModule = (function (glob) {
 
  // privates
  var basket = [];
 
  function doSomethingPrivate() {
    return basket;
  }
 
  function doSomethingElsePrivate() {
    return glob;
  }
 
  // Return an object exposed to the public
  return {
 
    addItem: function( values ) {
      basket.push(values);
    },
 
    getItemCount: function () {
      return basket.length;
    },
 
    // Public alias to a private function
    doSomething: doSomethingPrivate,
    doSomethingElse: doSomethingElsePrivate,
 
    getTotal: function () {
 
      var q = this.getItemCount(),
          p = 0;
 
      while (q--) {
        p += basket[q].price;
      }
 
      return p;
    }
  };
})(globalVar);
 
basketModule.addItem({
  item: "bread",
  price: 0.5
});
 
basketModule.addItem({
  item: "butter",
  price: 0.3
});
 
console.log( basketModule.getItemCount() );
console.log( basketModule.getTotal() );
console.log( basketModule.doSomething() );
console.log( basketModule.doSomethingElse() );

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////The Revealing Module Pattern////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var myRevealingModule = (function () {
 
    var privateCounter = 0;

    function privateFunction() {
        privateCounter++;
    }

    function publicFunction() {
        publicIncrement();
    }

    function publicIncrement() {
        privateFunction();
    }

    function publicGetCount(){
      return privateCounter;
    }

    // Reveal public pointers to
    // private functions and properties

   return {
        start: publicFunction,
        increment: publicIncrement,
        count: publicGetCount
    };

})();