require('./patch');
var Logger = require('./logger');
var findPattern = require('./eventEmitter.js');
var fs = require('fs');

var db = Logger('DB');


db.log('This functionality dosen\'t work');

// db.customMessage();
//

  var findPatternObject = new findPattern(/hello \w+/);
   findPatternObject
     .addFile('./json/fileA.html')
     .addFile(['test', './json/fileA.html'])
     .find()
     .on('found', function(file, match) {
       console.log('Matched "' + match + '" in file ' + file);
     })
     .on('error', function(err) {
       console.log('Error emitted ' + err.message);
});
