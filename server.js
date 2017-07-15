var express = require('express')
var app = express();
var port = 8080
app.listen(port);
console.log('Listening on port ' + port.toString())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://data/nonProfits.db');

conn.query('CREATE TABLE IF NOT EXISTS nonProfits (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ' +
	'cost TEXT, keyword1 TEXT, keyword2 TEXT, keyword3 TEXT, keyword4 TEXT, keyword5 TEXT);');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/html/home.html'));
});