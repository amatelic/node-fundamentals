function Logger(name) {
  if(!(this instanceof Logger)){
    return new Logger(name);
  }
  this.count = 0;
  this.name = name;
}

Logger.prototype.log = function (message) {
  this.count++;
  console.log('[' + this.name +']' + message);
};


module.exports = Logger;
