var makeSet = function(){
  var set = Object.create(setPrototype); // fix me
  set._storage = {};
  return set;
};

var setPrototype = {};

setPrototype.add = function(string){
  if (typeof string === 'string') {
    if (!this.contains(string)) {
      this._storage[string] = true;
    }
  }
};

setPrototype.contains = function(string){
  return this._storage[string] === true;
};

setPrototype.remove = function(string){
  if (this.contains(string)) {
    delete this._storage[string];
  }
};
