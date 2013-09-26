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

  list.contains = function(node,target){
    if (node.value === target) {
      return true;
    } else if (node.next !== null) {
      list.contains(node.next, target);
    } else {
      return false;
    }

/*
      if (list.head !== null || list.tail != null){
        
      } esle{

      }

      if (list.head.value === target) {
        return true;
      } else{
        list.head.next
      }

    }


    if (list.head.value === target) {
      return true;
    } else if (list.head.next !== null) {
      list.head.next.contains(target);
    } else {
      return false;
    }
  };
*/
  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
