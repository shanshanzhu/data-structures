var Queue = function() {
  this.storage = {};
  this.kicked = 0;
  this.total = 0;
};

Queue.prototype.enqueue = function(value){
  this.storage[this.total] = value;
  this.total ++;
};

Queue.prototype.dequeue = function(){
  if (this.size()) {
    var temp = this.storage[this.kicked];
    delete this.storage[this.kicked];
    this.kicked ++;
    return temp;
  }
};

Queue.prototype.size = function(){
  return this.total - this.kicked;
};

var test = new Queue();
