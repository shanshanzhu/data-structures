var MakeBinarySearchTree = function(key, value){
  this._left = null;
  this._right = null;
  this.key = key || null;
  this.value = [value];
};

var _ = {};
_.contains = function (list, target){
  for (var i = 0; i < list.length; i ++) {
    if (list[i] === target) {
      return true;
    }
  }
  return false;
};


MakeBinarySearchTree.prototype.insert = function (k, v) {
  var tree = new MakeBinarySearchTree(k, v);
  var temp;
  if (this.key === null) {
    this.value = tree.value;
    this.key = tree.key;
  }
  else if (this.key === tree.key && (!_.contains(this.value, tree.value[0]) ) ) {
    this.value.push(tree.value[0]);
  }
  else if (tree.key < this.key){
    if (this._left !== null) {
      this._left.insert (k,v);
    } else {
      this._left = tree;
    }
  }
  else {
    if (this._right !== null) {
      this._right.insert(k,v);
    } else {
      this._right = tree;
    }
  }
};

MakeBinarySearchTree.prototype.contains = function (key) {
  if (this.key === key){
    return true;
  } else if ()

};


