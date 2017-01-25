var db       = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.getAllUsers = function(cb) {
    db.get().collection('users').find({}, {password: false}).toArray(function(err, doc) {
        if (err){
            console.error(err);
            cb();
        } else {
            cb(doc);
        }
    })
};

exports.login = function(data, cb) {
    if(!data.email || !data.password) {
        return cb(null, { status: 400, msg: 'Логин и пароль обязательны к заполнению' });
    }

    db.get().collection('users').findOne({email: data.email}, function(err, user) {
        if (err){
            console.error(err);
            cb(err);
        } else {
            if(!user || data.email !== user.email || data.password !== user.password) {
                cb(null, { status: 401, msg: 'Логин и/или пароль неверны' });
            }else{
                cb(null, null, user);
            }
        }
    });
};

exports.registration = function(data, cb) {
    var userData = {
        username: data.username,
        email:    data.email,
        password: data.password
    };

    db.get().collection('users').findOne({email: data.email}, function(err, user) {
        if (err){
            console.error(err);
            cb(err);
        } else {
            if(user) {
                cb(null, { status: 400, msg: 'Пользователь с таким email уже существует' });
            }else{
                db.get().collection('users').insertOne(userData, function(err, result) {
                    if (err){
                        console.error(err);
                        cb(err);
                    } else {
                        console.log('Зарегистрирован новый пользователь, _id:', result.insertedId);
                        console.log(result.ops[0]);
                        cb(null, null, result.ops[0]);
                    }
                });
            }
        }
    });
};

exports.create = function createUser(data, cb) {
    var userData = {
        username: data.username,
        email:    data.email
    };

    db.get().collection('users').findOne({email: data.email}, function(err, user) {
        if (err){
            console.error(err);
            cb(err);
        } else {
            if(user) {
                cb(null, { status: 400, msg: 'Пользователь с таким email уже существует' });
            }else{
                db.get().collection('users').insertOne(userData, function(err, result) {
                    if (err){
                        console.error(err);
                        cb(err);
                    } else {
                        console.log('Создан новый пользователь, _id:', result.insertedId);
                        cb(null, null, result.insertedId);
                    }
                });
            }
        }
    });
};

exports.update = function updateUser(data, cb) {
    if(!data._id) return cb(null, { status: 400, msg: 'Не указан id пользователя.' });

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
            cb(null);
        }
    });
};

exports.delete = function deleteUser(id, cb) {
    if(!id) return cb(null, { status: 400, msg: 'Не указан id пользователя.' });

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

