var makeStack = function() {
  var stack = Object.create(stackMethods);
  stack.storage = {};
  stack.storageSize = 0;
  return stack;
};

var stackMethods = {
  push : function(value){
    this.storage[this.storageSize] = value;
    this.storageSize++;
  },

  pop : function(){
    if (this.storageSize) {
      this.storageSize--;
      var temp = this.storage[this.storageSize];
      delete this.storage[this.storageSize];
      return temp;
    }
  },

  size : function(){
    return this.storageSize;
  }
};

