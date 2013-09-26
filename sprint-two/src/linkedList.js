// Note: don't use an array to do this.

var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    if (arguments.length === 1) {
      if (list.tail === null) {
        list.tail = makeNode(value);
        list.head = list.tail;
      } else {
        list.tail.next = makeNode(value);
        list.tail = list.tail.next;
      }
    }
  };

  list.removeHead = function(){
    if (list.head.next === null) {
      list.tail = null;
    }
    var temp = list.head.value;
    list.head = list.head.next;
    return temp;
  };

  list.contains = function(target, node){
    if (node === undefined) {
      node = list.head;
    }

    if (node.value === target) {
      return true;
    } else if (node.next !== null) {
      return list.contains(target, node.next);
    } else {
      return false;
    }

  };
  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
