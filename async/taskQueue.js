function TaskQueue(concurrency) {
  this.concurrency = concurrency;
  this.running = 0;
  this.queue = [];
}

TaskQueue.prototype.pushTask = function (task, callback) {
  this.queue.push(task);
  this.next();
};

TaskQueue.prototype.next = function () {
  var self = this;
  while(this.running < this.concurrency && this.queue.length){
    var task = this.queue.shift();
    task(execute.bind(self));
    self.running++;
  }
};

function execute(err) {
  this.running--;
  this.next();
  console.log("Allowd concurrency are " +  this.concurrency + " runnung right now " + this.running +
" waiting " + this.queue.length);
}

module.exports = TaskQueue;
