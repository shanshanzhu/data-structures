var makeStack = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0; // Hint: set an initial value here

  // Implement the methods below

  instance.push = function(value){
    size++;
    storage[size] = value;
    return value;
  };

  instance.pop = function(){
    var temp = storage[size];
    if (size) {
      delete storage[size];
      size--;
      return temp;
    }

  };

  instance.size = function(){
    return size;
  };

  return instance;
};
