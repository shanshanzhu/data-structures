// Note: don't use an array to do this.
var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;
  var total = 0;
  var headIndex = 0;

  list.addToTail = function(value){
    //create a new key:value pair in list, where the key is a total counter
    if (arguments.length === 1){
      list[total] = makeNode(value);
      list.tail = list[total].value;
      if (total === 0){
        list.head = list[0].value;
      }
      total ++;
    }
  };

  list.removeHead = function(){
    var temp = list.head;
    delete list[headIndex];
    headIndex ++;
    list.head = list[headIndex].value;
    return temp;
  };

  list.contains = function(){
    //loop through the nodes inside list, searching for whether or not node.value === the target
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
