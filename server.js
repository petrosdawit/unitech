var express = require('express')
var app = express();
var port = 8080
app.listen(port);
console.log('Listening on port ' + port.toString())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://nonProfits.db');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});