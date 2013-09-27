var HashTable = function(){
  this._limit = 8;
  // Use a limited array to store inserted elements.
  // It'll keep you from using too much space. Usage:
  //
  //   limitedArray.set(3, 'hi');
  //   limitedArray.get(3); // alerts 'hi'
  //
  // There's also a '.each' method that you might find
  // handy once you're working on resizing
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.isLinkedList = function(obj) {
  return obj.hasOwnProperty('head') && obj.hasOwnProperty('tail') && obj.hasOwnProperty('addtoTail') && obj.hasOwnProperty('removeHead') && obj.hasOwnProperty('contains');
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  console.log(i);
  var existingVal = this._storage.get(i);
  var linkedList;

  if (existingVal !== undefined){
    if (!this.isLinkedList(existingVal)) {
      linkedList = makeLinkedList();
      linkedList.addToTail([k,v]);
      this._storage.set(i,linkedList);
    } else {
      linkedList.addToTail([k,v]);
    }
  } else {
    this._storage.set(i, [k,v]);
  }
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i);
  if (this.isLinkedList(bucket)) {
    var result = bucket.contains(k);
    if (result[0]) {
      return result[1];
    }
    else {
      bucket = undefined;
    }
  }
  return bucket;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i);
  if (this.isLinkedList(bucket)){
    var result = bucket.conatins(k);
    if (result[0]) {}
  }
  this._storage.each(function(value, key, collection){
    if(i === key) {
      collection.splice(key,1);
    }
  });
};

// COPIED FROM hashTableHelpers.js

/*
 ********** NOTE: **********
 * Do not edit this code unless you see a bug!
 */


// This class represents an array with limited functionality and a maximum size.
// It will ensure that you don't accidentally try to use up too much space.
//
// Usage:
//   limitedArray.set(3, 'hi');
//   limitedArray.get(3); // returns 'hi'

var makeLimitedArray = function(limit){
  var storage = [];

  var limitedArray = {};
  limitedArray.get = function(index){
    checkLimit(index);
    return storage[index];
  };
  limitedArray.set = function(index, value){
    checkLimit(index);
    storage[index] = value;
  };
  limitedArray.each = function(callback){
    for(var i = 0; i < storage.length; i++){
      callback(storage[i], i, storage);
    }
  };

  var checkLimit = function(index){
    if(typeof index !== 'number'){ throw new Error('setter requires a numeric index for its first argument'); }
    if(limit <= index){ throw new Error('Error trying to access an over-the-limit index'); }
  };

  return limitedArray;
};

var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

// COPIED CODE FROM linkedList.js below, modified for our purposes

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

  list.remove = function(target, node){
    if (node === undefined) {
      node = list.head;
    }
/*  var nextNode = node.next
    if (list.head.value[0] === target) {
      return list.removeHead();
    } else if (node === null) {
      return undefinded;
    } else if (node.next.value[0] === target) {
      var temp = node.next.value[1];
      node.next = node.next.next;
        if (node.next === null) {
          list.tail = node;
        }
      return temp;
    } else {
      return list.remove(target, node.next);
    }
*/
    if (list.head.value[0] === target) {
      list.removeHead();
    } else if (node.next.value[0] === target) { // this condition accommodates searching key, value array pairs in our hash table collision resolution process
        node.next = node.next.next;
        if (node.next === null) {
          list.tail = node;
        }
    } else if (node.next.next !== null) {
      list.remove(target, node.next);
    } else {
      return undefined;
    }
  };

  list.contains = function(target, node){
    if (node === undefined) {
      node = list.head;
    }

    if (node.value[0] === target) { // this condition accommodates searching key, value array pairs in our hash table collision resolution process
      return [true, node.value[1]];
    } else if (node.next !== null) {
      return list.contains(target, node.next);
    } else {
      return [false];
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

