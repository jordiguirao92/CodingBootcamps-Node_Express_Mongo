//fs
var fs = require('fs');
fs.readFile('HelloWorld.js', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
  });

//path
var path = require('path');
var filename = path.basename('HelloWorld.js');
console.log(filename);