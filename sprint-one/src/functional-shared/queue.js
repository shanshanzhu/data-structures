var makeQueue = function(){
  var instance = {
    storage : {},
    kicked : 0,
    total : 0
  };
  return _.extend(instance, queueMethods);
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

