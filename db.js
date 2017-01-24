const MongoClient   = require('mongodb').MongoClient;
var stateDb = null;

exports.connect = function(url, done) {
    if(stateDb) return done();
    MongoClient.connect(url, function (err, database) {
        if (err) return done(err);
        console.log("Successfully connected to the database.");
        stateDb = database;
        done();
    });
};
exports.get = function() {
    return stateDb;
};