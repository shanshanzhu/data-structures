var keymap = { a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,q:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9,z:9};

var PreFixTree = function(val) {
  this.value = {};
  if(val){
    this.value[val] = 1;
  }
  this.children = {};
  // this.children = {key: new PreFixTree()}; key is the path to the new tree.
};

// PreFixTree.prototype.addValue = (){

// };

PreFixTree.prototype.store = function(currentWord, fullWord) {
  var keyNum = keymap[currentWord[0]];
  if (currentWord.length === 1) {
    if (!this.children[keyNum]) {
      this.children[keyNum] = new PreFixTree(fullWord);
    } else {
      this.children[keyNum].value[fullWord] = 1;
    }
    return;
  }
  //check if it exists firsts
  if (!this.children[keyNum]) {
    this.children[keyNum] = new PreFixTree();
  } 

  this.children[keyNum].store(currentWord.slice(1), fullWord);
};

//shanshan's way
PreFixTree.prototype.get = function(keyNum, fullNum) {
  var keyNum = keyNum + '';
  var key = keyNum[0];
  if (keyNum.length === 1) {
    if(this.children[key]) {
      return this.children[key].value;
    } else {
      return null;
    }
  }

  if(this.children[key]){
    return this.children[key].get(keyNum.slice(1),fullNum);
  } 

};

PreFixTree.prototype.walk = function(keyNum) {
  var node = this.children[keyNum];
  return {values: Object.keys(node.value), node: node};
};


var loadDictionary = function(listOfWords,trie){
  //where do we get our list of words?
  for (var i = 0; i < listOfWords.length; i++) {
    trie.store(listOfWords[i].toLowerCase(),listOfWords[i].toLowerCase());
  }
};


// exports.PreFixTree = PreFixTree;

//loadDictionary(['abc','sfaerw','gavin','shanshan']);
// console.log(trie);
