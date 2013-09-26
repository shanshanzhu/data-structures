var makeQueue = function(){
  var queue = Object.create(queueMethods);
  queue.storage = {};
  queue.kicked = 0;
  queue.total = 0;
  return queue;
};

var queueMethods = {
  enqueue : function(value){
    this.storage[this.total] = value;
    this.total ++;
  },
  dequeue : function(){
    if (this.size()) {
      var temp = this.storage[this.kicked];
      delete this.storage[this.kicked];
      this.kicked ++;
      return temp;
    }
  },
  size : function(){
    return this.total - this.kicked;
  }
};

