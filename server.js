var express = require('express');
var fs = require('fs');
var app = express();
var json

app.get('/', function (req, res) {
  // 输出 JSON 格式
  // console.log(req,123456)
  fs.readFile('text.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    json = data.toString()
  });
  res.send(json);
  console.log(json)
})

var server = app.listen("8080", function () {

  var host = server.address().address
  var port = server.address().port

  console.log(host, port)

})