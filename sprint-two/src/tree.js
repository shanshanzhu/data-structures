
var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = [];

  var _ = {};
  _.extend = function(destination, source) { // assumes all methods in source are at top level
    for (var key in source) {
      destination[key] = source[key];
    }
  };
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
  this.children.push(makeTree(value));
};

treeMethods.contains = function(targetValue, startingNode){
  if (startingNode === undefined) {
    startingNode = this;
  }
  var status = false;

  var search = function(targetValue, startingNode) {
    if (!status) {
      if (startingNode.value === targetValue) {
        status = true;
      }
      if (startingNode.children !== []) {
        for (var i = 0; i < startingNode.children.length; i ++) {
          search(targetValue, startingNode.children[i]);
        }
      }
    }
  };
  search(targetValue, startingNode);

  return status;
};