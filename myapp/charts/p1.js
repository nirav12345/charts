var express = require('express');
var app = express();
app.set('view engine', 'jade');


app.get('/', function (req, res){
  var query = "CONTEMPORARY PACKAGING TECHNOLOGIES LIMITED";


var fs = require('fs');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/company';
mongo.connect(url, function(err, db) {
  if (err) throw err


db.collection('companyinfo10').aggregate([
  { $match: {c_class : "Public"} },
  { $match: {paidup_capital: {$type: 16}}},

  { 
  $project: 
  {
    "_id": 0,
    "range":
      {
      $concat: [
        
      {
        $cond: [ { $and: [
          { $gte: ["$paidup_capital", 0] }, 
          { $lt:  ["$paidup_capital", 50000] } 
        ] }, "0 - 50k .", "" ]
        },


        // {
        // $cond: [ { $lte: ["$paidup_capital", 50000] }, "0-50k", "" ]
        // }, 
        
        {
        $cond: [ { $and: [
          { $gte: ["$paidup_capital", 50000] }, 
          { $lt:  ["$paidup_capital", 100000] } 
        ] }, "50k.-1 lac", "" ]
        },
       
        {
        $cond: [ { $and: [
          { $gte: ["$paidup_capital", 100000] }, 
          { $lt:  ["$paidup_capital", 500000] } 
        ] }, "1 lac-5 lac", "" ]
        },

        {
        $cond: [ { $and: [
          { $gte: ["$paidup_capital", 500000] }, 
          { $lt:  ["$paidup_capital", 1000000] } 
        ] }, "5 lac-10 lac", "" ]
        },


        {
        $cond: [ { $gte: ["$paidup_capital", 1000000] }, "> 10 lac", "" ]
        }
      
      ]
    }
  }},
  { $group: { _id: "$range", count: { $sum: 1 } } },
  { $sort: { "_id": 1 } },
]).toArray(function(err, docs) {  
          console.log(docs);
          docs.splice(0, 1);
          var t1,t2,t3;
            t1 = docs[1];
            t2 = docs[2];
            t3 = docs[3];

            
            docs[1] = t3;
            docs[2] = t1; 
            docs[3] = t2;


          // console.log(docs)
        res.render('groupby', { 
        title: 'Hey',
        messages: docs
       });



});
});

});



var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;

console.log('Example app listening at http://%s:%s', host, port);
})