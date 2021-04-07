var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var path = require('path');
var fs = require('fs');
var alert = require('alert-node');


var app = express();

var client = mongodb.MongoClient.connect("mongodb://localhost/UsersAccounts");


app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'mainPage')));
app.use(express.static(path.resolve(__dirname, 'BuyShop')));
app.use(express.static(path.resolve(__dirname, 'tradeShop')));
app.use(express.static(path.resolve(__dirname, 'contactUs')));

app.get('/',function(req,res){
  var stream = fs.createWriteStream('mainPage/datafile.json');
  var data = {"UserName":"TRADEZ"};
  var dta = JSON.stringify(data);
  stream.write(dta);
  res.sendFile('Home.html', {root:path.join(__dirname,'./mainPage')});

});


app.post('/WebProfile.html', function(req,res){

    res.sendFile('WebProfile.html', {root:path.join(__dirname,'./public')});

    app.post('/Home', function (req, res){
      var statement =req.body ;
        client.then(function (db) {
          var statement = req.body;
          db.collection('usersInformation').find({UserName:statement.UserName, Password:statement.Password}).toArray(function (err,result){
            if (err){
              alert("Error");
            }else{
              if(result.length !=0){
                var data = statement.UserName;
                var stream = fs.createWriteStream('mainPage/datafile.json');
                var dta = JSON.stringify(statement);
                stream.write(dta);
                res.sendFile('Home.html', {root:path.join(__dirname,'./mainPage')});

              }else{
                  res.redirect(req.get('referer'));
                  alert ("Error Wrong Username or Password");
              }
            }
            });
          });
      });

      app.post('/NewHome', function (req, res){
        var statementNew = req.body;
        client.then (function (db){
          db.collection('usersInformation').find({UserName:statementNew.UserName}).toArray(function(err,results){
            if(!err){
              if(results.length ==0){
                db.collection('usersInformation').insertOne(statementNew, function(err,results){
                  if(err){
                    console.log("error");
                  }
                });

                res.redirect(req.get('referer'));
              }else{
                res.redirect(req.get('referer'));
                alert ("Error Username Already in use");
              }
            }
          });

        });

});
});


app.post('/buyItems.html', function(req,res){
      res.sendFile('buyItems.html', {root:path.join(__dirname,'./BuyShop')});
});

app.post('/startTrade.html', function(req,res){
      res.sendFile('startTrade.html', {root:path.join(__dirname,'./tradeShop')});
});

app.post('/contactUs.html', function(req,res){
      res.sendFile('contactUs.html', {root:path.join(__dirname,'./contactUs')});
});

console.log("post");


app.listen(10000, ()=>console.log('Server running on port'));
