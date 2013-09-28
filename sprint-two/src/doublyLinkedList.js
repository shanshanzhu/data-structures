// Note: don't use an array to do this.

var makeDoublyLinkedList = function(){
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
    var temp;
    if (this.head === null) {
      return undefined;
    } else if (this.head._next === null) {
      temp = this.head._value;
      this.head = null;
      this.tail = this.head;
      return temp;
    } else {
      temp = this.head._value;
      this.head._next._prev = null;
      this.head = this.head._next;
      return temp;
    }
  };

  list.removeTail = function(){
    var temp;
    if (this.tail === null) {
      return undefined;
    } else if (this.tail._prev === null) {
      temp = this.tail._value;
      this.tail = null;
      this.head = this.tail;
      return temp;
    } else {
      temp = this.tail._value;
      this.tail._prev._next = null;
      this.tail = this.tail._prev;
      return temp;
    }
  };

  list.contains = function(target, node){
    if (node === undefined) {
    	node = list.head;
    }
		if (node._value === target) {
			return true;
		} else if (node._next !== null) {
			return list.contains(target, node._next);
		} else {
			return false;
		}
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
