function PropertyDecorator() {
   this.build = function() {
      var decoration=this.decorate();
      return "The decoration I did: "+decoration;
   };
}

//we set the parent (those prototype that instances of this class will delegate calls to) 
OpenButtonDecorator.prototype = new PropertyDecorator();
function OpenButtonDecorator() {
   this.decorate = function() {
     return "open button";
   };
}


SeeButtonDecorator.prototype = new PropertyDecorator();
function SeeButtonDecorator() {
   this.decorate = function() {
      return "see button";
   };
}
