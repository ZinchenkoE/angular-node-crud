var db       = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.getAllUsers = function(cb) {
    db.get().collection('users').find().toArray(function(err, doc) {
        if (err){
            console.error(err);
            cb();
        } else {
            cb(doc);
        }
    })
};
exports.getUserByEmail = function(email, cb) {
    db.get().collection('users').findOne({email: email}).toArray(function(err, doc) {
        if (err){
            console.error(err);
            cb();
        } else {
            cb(doc);
        }
    })
};
exports.create = function createUser(data, cb) {
    var userData = {
        username: data.username,
        email:    data.email
    };

    db.get().collection('users').insertOne(userData, function(err, result) {
        if (err){
            console.error(err);
            cb(err);
        } else {
            console.log('Создан новый пользователь, _id:', result.insertedId);
            cb(null, result.insertedId);
        }
    });
};
exports.update = function updateUser(data, cb) {
    if(!data._id) return cb('Не указан id пользователя.');

    var userData = {
        username: data.username,
        email:    data.email
    };

    db.get().collection('users').updateOne({ _id: ObjectID(data._id) }, userData, function(err, result) {
        if (err){
            console.error(err);
            cb(err);
        } else {
            console.log('Пользователь с id' + data.id + ' успешно отредактирован');
            cb(null, result.insertedId);
        }
    });
};
exports.delete = function deleteUser(id, cb) {
    if(!id) return cb('Не указан id пользователя.');

    db.get().collection('users').deleteOne({ _id: ObjectID(id) }, function(err) {
        if (err){
            console.error(err);
            cb(err);
        } else {
            console.log('Пользователь успешно удален');
            cb(null);
        }
    });
};

