var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('./utilities');

function readFile(filname, callback) {
  fs.readFile(filname, 'utf8', function (err, file) {
    if(err){
      return callback(err);
    }
    findLinks(filname, file, function(links){
      console.log(links);
      return callback(null, file);
    });
  });
}

function findLinks(file, content, callback) {
  var expresion = /(http|s)(.+)(?="\>)/g;
  var data = content.match(expresion);
  return callback(data);
}

function spider(url, callback) {
  var filename = utilities.urlToFilename(url);
  fs.exists(filename, function(exists) {
    if(exists) {
      readFile(filename, function (err, data) {
        if(err){
          callback(err);
        }
        return callback(null, data, false);
      });
    }
    console.log('create file');
    return callback(null);

  });
}





spider('http://www.example.com)', function (err, file, exsists) {
  if(err){
      console.error(err);
  }else if (exsists) {
    // console.log('Finished loading files');
  }else {
    // console.log('File alredy exsists');
    // console.log(file);
  }
});
