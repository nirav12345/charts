var fs = require('fs');

function charPos(str, char) {
 return str
         .split("")
         .map(function (c, i) { if (c == char) return i; })
         .filter(function (v) { return v >= 0; });
}

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/company';
mongo.connect(url, function(err, db) {
	if (err) throw err

	db.createCollection("companyinfo8", function(err, collection){



		fs.readFile('company.csv', 'utf8', function (err, data) {
		var array1=[];
		var lines = data.split("\n");
		
		for (var j = 0; j < lines.length; j++) {

		  	var x=lines[j];
			var y=charPos(x, '"');

		// ========
		// for loops
		// ========
			for (var i = y[0]; i < y[1]; i++) {
				
				if(x[i]===','){
				 		x = x.substring(0, i) + '::' + x.substring(i+1);
				}	
			};

			for (var i = y[2]+2; i < y[3]; i++) {
				if(x[i]==','){
					x = x.substring(0, i) + '::' + x.substring(i+1);
				}
			};
			for (var i = y[4]+4; i < y[5]; i++) {
				if(x[i]==','){
					x = x.substring(0, i) + '::' + x.substring(i+1);
				}
			};

		// ===========
		// insertion of another
		// ===========


			var array2 = [];
			array2[j] = x.split(",");
			
			if(typeof array2[j][5] != "undefined")	{ 
			var find = '::';
			var re = new RegExp(find, 'g');
			array2[j][5] = array2[j][5].replace(re, '');
			var find = '"';
			var re = new RegExp(find, 'g');
			array2[j][5] = array2[j][5].replace(re, '');
			

			if(typeof array2[j][6] != "undefined")	{ 
			var find = '::';
			var re = new RegExp(find, 'g');
			array2[j][6] = array2[j][6].replace(re, '');
			var find = '"';
			var re = new RegExp(find, 'g');
			array2[j][6] = array2[j][6].replace(re, '');
			

			var a = array2[j][11],city;     

				if(typeof a != "undefined"){
				var y = a.split(' ');
				var b = y.indexOf('Gujarat');
				city = y[b-1];
				}
				else
				{
				city = "no-address";
				}
				//console.log(city);

		//==========
		//insert in mongodb
		//==========


			db.collection('companyinfo10').insert({
				"cin": array2[j][0],
				"name":array2[j][1],
				"status":array2[j][2] ,
				"c_class": array2[j][3],
				"catagory": array2[j][4],
				"authorized_capital":Number(array2[j][5]),
				"paidup_capital": Number(array2[j][6]), 
				"registration_date": array2[j][7],
				"registration_state": array2[j][8],
				"roc":array2[j][9] ,
				"principal_activity": array2[j][10],
				"address":array2[j][11] ,
				"subcatagory": array2[j][12], 
				"city":city }) 

		  	
			}}
		  }
		  
		});  

	}); 

});