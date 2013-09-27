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
  return obj.hasOwnProperty('head') && obj.hasOwnProperty('tail') && obj.hasOwnProperty('addToTail') && obj.hasOwnProperty('removeHead') && obj.hasOwnProperty('contains');
};
HashTable.prototype.whatname = function (k) {
  var i = getIndexBelowMaxForKey(k, this._limit);
  return this._storage.get(i);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i);
  var linkedList;

  // if something already exists in storage under i
  if (bucket !== undefined){
    // first check that what exists is not a linked list, in which case we need to create one
    if (!this.isLinkedList(bucket)) {
      linkedList = makeLinkedList();
      linkedList.addToTail(bucket);
      linkedList.addToTail([k,v]);
      this._storage.set(i,linkedList);
    // if what exists is a linked list, we add the [k, v] pair to the tail of the linked list
    } else {
      bucket.addToTail([k,v]);
    }
  // if nothing exists in storage under i, we set the value at i to be [k, v]
  } else {
    this._storage.set(i, [k,v]);
  }
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i);
  // if what's in the bucket is a linked list, we need to search the linked list using the contains method for linked lists
  if (this.isLinkedList(bucket)) {
    // we use the .contains method to search the linked list for k, and if we find k we return the corresponding v
    // .contains returns an array containing [true/false, v]
    var result = bucket.contains(k);
    if (result[0]) {
      return result[1];
    }
    // if we didn't find the key in the linked list, then k returns no value, i.e. undefined
    else {
      bucket = undefined;
    }
  }
  return bucket;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i);
  var result;
  // if what's in the bucket is a linked list, we call the list.remove method
  if (this.isLinkedList(bucket)){
    // if there are two items in our linked list, we need to convert the value in this._storage back
    // to just one [k,v] pair if list.remove successfully removes something
    if (bucket.length === 2){
      result = bucket.remove(k);
      if (result !== undefined) {
        this._storage.set(i,bucket.head.value);
      }
      return result;
    // if there are greater than two items in our linked list, we can just go ahead and look for k and remove it if we find it
    } else {
      return bucket.remove(k);
    }
  //if what's in the bucket is not a linked list, we just return the value in [k,v] and reset this._storage[i] to undefined 
  } else {
    result = bucket[1];
    this._storage.set(i, undefined);
    return result;
  }
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
  list.length = 0;

  list.addToTail = function(value){
    if (arguments.length === 1) {
      if (list.tail === null) {
        list.tail = makeNode(value);
        list.head = list.tail;
      } else {
        list.tail.next = makeNode(value);
        list.tail = list.tail.next;
      }
      list.length ++;
    }
  };

  list.removeHead = function(){
    if (list.head.next === null) {
      list.tail = null;
    }
    var temp = list.head.value[1];
    list.head = list.head.next;
    list.length --;
    return temp;
  };

  list.remove = function(target, node){
    if (node === undefined) {
      node = list.head;
    }

    // we start by searching the head of the list
    if (list.head.value[0] === target) {
      return list.removeHead();
    // if we didn't find the target in the head node, we search the next node
    } else if (node.next.value[0] === target) { // this condition accommodates searching key, value array pairs in our hash table collision resolution process
        var temp = node.next.value[1];
        node.next = node.next.next;
        if (node.next === null) {
          list.tail = node;
        }
        list.length --;
        return temp;
    // if we didn't find the target in the next node, we search the node after that--if there is such a node
    } else if (node.next.next !== null) {
        return list.remove(target, node.next);
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

