var express = require('express');
var app = express();
var port = 8080;
app.listen(port);
console.log('Listening on port ' + port.toString());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://data/nonProfits.db');

conn.query('CREATE TABLE IF NOT EXISTS nonProfits (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, ' +
	'cost TEXT, keyword1 TEXT, keyword2 TEXT, keyword3 TEXT, keyword4 TEXT, keyword5 TEXT, approved INTEGER);');

var csv = require('csv-parser');
var fs = require('fs');

var csvData = [];

// updateCSV();

function getFromCSV(){
	var csvData = [];
	fs.createReadStream('data/nonProfits.csv')
	.pipe(csv())
	.on('data', function (data) {
		csvData.push([data.name, data.description, data.cost, data.keyword1, data.keyword2,
			data.keyword3, data.keyword4, data.keyword5, data.approved]);
	});	
	setTimeout(function () {
		for (var i = 0; i < csvData.length; i++) {
			console.log(csvData);
			var q = conn.query('INSERT INTO nonProfits (name, description, cost, keyword1, keyword2, keyword3, ' + 
				'keyword4, keyword5, approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
  			[csvData[i][0], csvData[i][1], csvData[i][2], csvData[i][3], csvData[i][4], csvData[i][5], csvData[i][6], 
  			csvData[i][7], csvData[i][8]], 
  			function(err, result){ 
			    if (err){
			    	throw err;
			    }
  			}
  		);			
	}
	}, 500);	
}

//     setTimeout(function () {
// console.log(csvData);
//     }, 5000);

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/html/home.html'));
});
