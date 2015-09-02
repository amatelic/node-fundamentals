var cluster = require('cluster');
var http = require('http');
var workers = {};
var activeWorkers = [];

if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for (var i = 0; i < numWorkers; i++) {
      var worker = cluster.fork();
      var id = worker.id;
      workers[id]  = worker;
      activeWorkers.push(id);
  }

  setTimeout(function () {
    workers[activeWorkers[0]].send("to je samo test");
  }, 2000);

  cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

} else {
  var app = require('express')();
  app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();});

  var server = app.listen(3000, function() {

    process.on('message', function(message) {
      console.log(message);
    });
    console.log('Process ' + process.pid + ' is listening to all incoming requests');
  });
}
