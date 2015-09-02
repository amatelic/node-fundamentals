var fs = require('fs');
var tasks = [];
var completed = 0;



tasks.push(function (done) {
  readFile('../json/fileA.html', function (err, data) {
    console.log(data);
    done();
  });
});

tasks.push(function (done) {
  readFile('../json/fileA.html', function (err, data) {
    console.log(data);
    done();
  });
});


tasks.forEach(function (task) {
  task(function () {
    if(++completed === tasks.length){
      finish();
    }
  });
});

function finish() {
  console.log('All task have finised');
}

function readFile(name, callback) {
  fs.readFile(name, 'utf8', function (err, body) {
    if(err){
      return callback(err);
    }
    return callback(null, body);
  });
}
