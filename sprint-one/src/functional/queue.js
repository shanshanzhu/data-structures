var makeQueue = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var kicked = 0;
  var total = 0;

  // Implement the methods below

  instance.enqueue = function(value){
    storage[total] = value;
    total ++;
  };

  instance.dequeue = function(){
    if (instance.size()) {
      var temp = storage[kicked];
      delete storage[kicked];
      kicked ++;
      return temp;
    }
  };

  instance.size = function(){
    return total - kicked;
  };

  return instance;
};
