var fs = require('fs');
var TaskQueue = require('./taskQueue.js');
var readQueus = new TaskQueue(2);



readQueus.pushTask(function (done) {
  readFile('../json/fileA.html', function (err, data) {
    console.log("1");
    done();
  });
});

readQueus.pushTask(function (done) {
  readFile('../json/fileA.html', function (err, data) {
    console.log("2");
    done();
  });
});

readQueus.pushTask(function (done) {
  readFile('../json/fileA.html', function (err, data) {
    console.log("3");
    done();
  });
});

readQueus.pushTask(function (done) {
  readFile('../json/fileA.html', function (err, data) {
    console.log("4");
    done();
  });
});

readQueus.pushTask(function (done) {
  readFile('../json/fileA.html', function (err, data) {
    console.log("5");
    done();
  });
});
// readQueus.pushTask(function (done) {
//   readFile('../json/fileA.html', function (err, data) {
//     console.log(data);
//     done();
//   });
// });
//
function readFile(name, callback) {
  fs.readFile(name, 'utf8', function (err, body) {
    if(err){
      return callback(err);
    }
    return callback(null, body);
  });
}
