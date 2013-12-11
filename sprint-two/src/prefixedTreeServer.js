var fs = require('fs'),
    binaryCSV = require('binary-csv'),
    PreFixTree = require('./preFixTree.js').PreFixTree;
    http = require('http');

var saveData = function() {
  var parser = binaryCSV();//must be defined here for the scope!
  console.log("In saveData");
  var path = './dict.csv';
  fs.createReadStream(path).pipe(parser)
    .on('data', function(line) {
        var word = line.toString().split('\n')[0];
        loadDictionary(word);
        
    })
    .on('error', function(err) {
      console.log('cannot read csv', err);
    })
    .on('end', function(){
      console.log(trie);
      debugger;
    });

};


var trie = new PreFixTree();

var loadDictionary = function(listOfWords){
  //where do we get our list of words?
  for (var i = 0; i < listOfWords.length; i++) {
    trie.store(listOfWords[i].toLowerCase(),listOfWords[i].toLowerCase());
  }
};

// console.log(PreFixTree);

saveData();