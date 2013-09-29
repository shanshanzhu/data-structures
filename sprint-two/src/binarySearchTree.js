var MakeBinarySearchTree = function(key, value){
  this._left = null;
  this._right = null;
  if (key === undefined) {this.key = null; }
  else {this.key = key; }
  this.value = [value];
};

var _ = {};
_.contains = function (list, target){
  _.each (list, function (item){
    if (item === target) {
      return true;
    }
  });
  return false;
};
_.each = function (list, iterator) {
  for (var i = 0; i < list.length; i ++) {
    iterator (list[i], i, list);
  }
};
_.invokeSingleItem = function (item, callback) {
  if (typeof callback === 'function') {
    callback.apply(item);
  } else {
    item[callback].apply(item);
  }
};
_.invokeArray = function (array, callback){
  _.each(array, function (item){
    _.invokeSingleItem(item, callback);
  });
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
  if (key === undefined) { return undefined;}
  else {
    if (key === this.key) { return true; }
    else if (key < this.key) {
      if (this._left === null) { return false; }
      else { return this._left.contains(key); }
    }
    else{
      if (this._right === null) { return false;}
      else { return this._right.contains(key); }
    }
  }
};

MakeBinarySearchTree.prototype.depthFirstLog = function (callback) {
//////checkout this simplified version!!! that worked!
//console.log(this.key)
//  this.value = _.invokeArray(this.value, callback);
//  if (this._left) { this._left.depthFirstLog(callback);}
//  if (this._right) { this._right.depthFirstLog(callback);}
//};

//my code, tested to work;
  var traverse = function (node) {
    console.log(node.key);
    _.invokeArray(node.value, callback);
    if (node._left === null ) {
      if (node._right === null) {return;} //just to be safe,but not necessary at all;
      else if (node._right !== null) {traverse (node._right);} 
    }
    else{
      traverse (node._left);
      if (node._right !== null) {traverse (node._right); }
    }
  };
  traverse (this);

};

var a = new MakeBinarySearchTree (15,[3,5,1]);
a.insert(4,[2,4,3]);
a.insert(1,[2,4,3]);
a.insert(7,[2,4,3]);
a.insert(10,[2,4,3]);
a.insert(13,[2,4,3]);
a.insert(9,[2,4,3]);
a.insert(20,[2,4,3]);
a.insert(17,[2,4,3]);
a.insert(30,[2,4,3]);

a.depthFirstLog(Array.prototype.sort);