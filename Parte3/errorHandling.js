var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res, next) {
    fs.readFile('/file-does-not-exist', function (err, data) {
      if (err) {
        console.log('Si hay error');
        next(err); // Pass errors to Express.
      } else {
         console.log('No hay error');
         res.send(data);
      }
    })
  })


app.listen(3000)