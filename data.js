var statement;

var MongoClient = require ('mongodb').MongoClient;

var client = new MongoClient();

client.connect ("mongodb://localhost/",function(err,db){
  if (err)
    throw err;

  var newUsers = db.db ("UsersAccounts");

  var users=[{"userName": "Bradd_91", "EmailAddress": "brad_J91@gmail.com",
  "Password": "bj91@123", "Address": "33 Westminster Court, St Albans",
  "PhoneNumber": "(01727) 874254"},
  {"userName": "R_Betty", "EmailAddress": "rose22_B@outlook.com",
  "Password": "roB1222", "Address": "Toftwood, East Common, Harpenden",
  "PhoneNumber": "(01727) 111513"},
  {"userName": "Jess_Li", "EmailAddress": "jess_li@outlook.com",
  "Password": "JL_@$^*", "Address": "37 Ryelands, Welwyn Garden City",
  "PhoneNumber": "(01707) 340522"}];

  newUsers.createCollection("usersInformation", function(err, collection){
    collection.insertMany(users, function(err,result){
      if(err){
        console.log("Failed to add");
      }else{
        console.log("Success");
      }
    });

    collection.find({_id:3,userName:"Jess_Li"}, function(err, results){
      if(err){
        console.log("Failed to add");
      }else{
        console.log(JSON.stringify(results));
      }

  });
});

});
