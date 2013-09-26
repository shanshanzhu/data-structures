var Stack = function() {
  this.storage = {};
  this.storageSize = 0;
};

Stack.prototype.push = function(value){
  this.storage[this.storageSize] = value;
  this.storageSize++;
};

Stack.prototype.pop = function(){
  if (this.storageSize) {
    this.storageSize--;
    var temp = this.storage[this.storageSize];
    delete this.storage[this.storageSize];
    return temp;
  }
};

Stack.prototype.size = function(){
  return this.storageSize;
};

var test = new Stack();

