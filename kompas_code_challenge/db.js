//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var assert = require('assert');
var fs = require('fs');


// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/kompas_code_challenge';




// Use connect method to connect to the Server

var DatabaseConnection = {
  createData: function(){
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // do some work here with the database.
        insertUsers(db);
        insertPlaces(db);
        //Close connection
        db.close();
      }
    })
  },
  insert: function(db, data, collectionName, callback) {
    //var data = JSON.parse(fs.readFileSync(file, 'utf8'));
    var collection = db.collection(collectionName);

    collection.insertMany(data, function(err, res) {
      assert.equal(err, null);
      assert.equal(data.length, result.result.n);
      assert.equal(data.length, result.ops.length);

      callback(res);
    })
  },

  getCollection: function(collectionName, callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        var collection = db.collection(collectionName);
        console.log('Connection established to', url);
        collection.find({}).toArray(function(err, res) {
          assert.equal(err, null);
          db.close();
          callback(res);
        });
      }
    });



  }
};

var insertUsers = function(db) {
  var data = JSON.parse(fs.readFileSync("./users.json", 'utf8'));
  DatabaseConnection.insert(db, data, "users", function(places) {
    console.log(places);
  });
};

var insertPlaces = function(db) {
  var data = JSON.parse(fs.readFileSync("./places.json", 'utf8'));
  DatabaseConnection.insert(db, data, "places", function(places) {
    console.log(places);
  });
};


module.exports = DatabaseConnection;