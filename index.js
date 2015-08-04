var R = require('ramda');
var fs = require('fs');
var liner = require('./liner');

// utils
var split = R.split('');
var join = R.join('');
var contains = R.flip(R.contains);
var containsChar = R.compose(contains, split);
var filterCharsByWord = R.compose(R.filter, containsChar);

var test = function(badword){
  return R.compose(R.equals(badword), join, filterCharsByWord(badword), split);
};

// let's try it out
var testSnond = test('snond');

var values = [
  'synchronized',
  'misfunctioned',
  'mispronounced',
  'shotgunned',
  'snond'
];

console.log(values.map(testSnond));


// optional challenge 1
// use input from https://code.google.com/p/dotnetperls-controls/downloads/detail?name=enable1.txt
var filepath = process.argv[2];
if(filepath){
  var testRrizi = test('rrizi');
  var matches = [];

  var source = fs.createReadStream(filepath);
  source.pipe(liner);

  liner.on('readable', function () {
       var line;
       while (line = liner.read()) {
         if(testRrizi(line)){
           matches.push(line);
         }
       }
  });

  liner.on('end', function() {
       //console.log(matches);
       console.log(matches.length);
  });
}
