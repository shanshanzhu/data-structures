
var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = [];
  newTree.parent = null;
  _.extend(newTree, treeMethods);
  return newTree;
};
var _ = {};
_.extend = function(destination, source) { // assumes all methods in source are at top level
  for (var key in source) {
    destination[key] = source[key];
  }
};
_.each = function (collection, iterator){
  for (var i = 0; i < collection.length; i ++) {
    iterator (collection[i], i, collection);
  }
};

var treeMethods = {};

treeMethods.addChild = function(value){
  this.children.push(makeTree(value));
  this.children[this.children.length-1].parent = this;
};
treeMethods.findAllTreesWithValue = function(target, node) {
  node = node || this;
  var result = [];
  var traverse = function(node) {
    if (node.value === target) {
      result.push(node);
    } else if (node.children !== []){
      _.each(node.children, function(child){
        traverse(child);
      });
    }
  };
  traverse (node);
  return result;
};
treeMethods.removeFromParent = function (value){
  var trees = this.findAllTreesWithValue(value);
  _.each(trees, function (tree){
    if (tree.parent !== null) {
      var arr = tree.parent.children;
      _.each(arr, function (item, i){
        if (item === tree){
          arr.splice(i,1);
        }
      });
      tree.parent = null;
    }
  });
};

treeMethods.contains = function(targetValue, startingNode){
  startingNode = startingNode || this;
//  if (startingNode === undefined) {
//    startingNode = this;
//  }
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