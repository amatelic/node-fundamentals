var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var util = require('util');

function findPattern(regex) {
  EventEmitter.call(this);
  this.regex = regex;
  this.files = [];
}
util.inherits(findPattern, EventEmitter);

findPattern.prototype.addFile = function (file) {
  if(file.constructor === Array){
    for (var path of file) {
      this.files.push(path);
    }
    return this;
  }
  this.files.push(file);
  return this;
};


findPattern.prototype.find = function () {
  this.files.forEach(function (file) {
    fs.readFile(file, 'utf8', function (err, content) {
      if(err){
        return this.emit('error', err);
      }
      this.emit('fileread', file);
      var match = null;
      if(match = content.match(this.regex)){
        match.forEach(function (elem) {
          this.emit('found', file, elem);
        }.bind(this));
      }
    }.bind(this));
  }.bind(this));

  return this;
};



module.exports = findPattern;
