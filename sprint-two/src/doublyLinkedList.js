// Note: don't use an array to do this.

var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    if (this.tail === null) {
      this.tail = makeNode(value);
      this.head = this.tail;
    } else {
      var temp = this.tail;
      this.tail._next = makeNode(value);
      this.tail = this.tail._next;
      this.tail._prev = temp;
    }

  };

  list.addToHead = function(value) {
    if (this.head === null) {
      this.head = makeNode(value);
      this.tail = this.head;
    } else {
      var temp = this.head;
      this.head._prev = makeNode(value);
      this.head = this.head._prev;
      this.head._next = temp;
    }

  };

  list.removeHead = function(){
 
  };

  list.removeTail = function(){

  };

  list.contains = function(target, node){


  };
  return list;
};

var makeNode = function(value){
  var node = {};
  node._value = value;
  node._next = null;
  node._prev = null;

  return node;
};
