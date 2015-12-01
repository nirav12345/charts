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

{ $match: {c_class : "Private"} },
{ $match: {authorized_capital: {$type: 16}}},
{
  $project: 
  {
    "_id": 0,
    "range":
      {
      $concat: [
        
        {
        $cond: [ { $and: [
          { $gte: ["$authorized_capital", 0] }, 
          { $lt:  ["$authorized_capital", 100000] } 
        ] }, "0 - 1 lac.", "" ]
        },

        // {
        // $cond: [ { $and: [
        //   { $gte: ["$authorized_capital", 50001] }, 
        //   { $lt:  ["$authorized_capital", 100000] } 
        // ] }, "50k - 1 lac.", "" ]
        // },

        {
        $cond: [ { $and: [
          { $gte: ["$authorized_capital", 100000] }, 
          { $lt:  ["$authorized_capital", 500000] } 
        ] }, "1 lac - 5 lacs.", "" ]
        },

        // {
        // $cond: [ { $and: [
        //   { $gte: ["$authorized_capital", 500001] }, 
        //   { $lt:  ["$authorized_capital", 1000000] } 
        // ] }, "5 lac - 10 lacs.", "" ]
        // },
    
        {
        $cond: [ { $and: [
          { $gte: ["$authorized_capital", 500000] }, 
          { $lt:  ["$authorized_capital", 1000000] } 
        ] }, "5 lac - 10 lacs.", "" ]
        },
    

        {
        $cond: [ { $and: [
          { $gte: ["$authorized_capital", 1000000] }, 
          { $lt:  ["$authorized_capital", 2500000] } 
        ] }, "10 lac - 25 lacs.", "" ]
        },

        {
        $cond: [ { $and: [
          { $gte: ["$authorized_capital", 2500000] }, 
          { $lt:  ["$authorized_capital", 5000000] } 
        ] }, "25 lacs-50 lacs", "" ]
        },
        {
        $cond: [ { $and: [
          { $gte: ["$authorized_capital", 5000000] }, 
          { $lt:  ["$authorized_capital", 10000000] } 
        ] }, "50 lacs-1 cr", "" ]
        },
 

        {
        $cond: [ { $gte: ["$authorized_capital", 10000000] }, "> 1 cr", "" ]
        }
      
      ]
    }
  }},
  { $group: { _id: "$range", count: { $sum: 1 } } },
  { $sort: { "_id": 1 } },
]).toArray(function(err, docs) {
          
          docs.splice(0, 1);
          // var t1,t2,t3,t4,t5,t6;
          //   t1 = docs[1];
          //   t2 = docs[2];
          //   t3 = docs[3];
          //   t4 = docs[4];
          //   t5 = docs[5];
          //   t6 = docs[6]; 
            

            
          //   docs[1] = t3;
          //   docs[2] = t5; 
          //   docs[3] = t2;
          //   docs[4] = t4; 
          //   docs[5] = t6;
          //   docs[6] = t1; 
            
          console.log(docs)



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