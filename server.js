var express     = require('express');
var bodyParser  = require('body-parser');
var jwt         = require('jsonwebtoken');
var expressJwt  = require('express-jwt');
var app         = express();
var db          = require('./db');
var Users       = require('./model/users');
const jwtSecret = 'dsfasf43w3f43f3f;lkv';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({path: ['/login', '/registration']})); // декодирование jwt

app.post('/login', function(req, res) {
    Users.login(req.body, function(err, valid, user){
        if(err) {
            res.sendStatus(500); console.log('_______1_______');
        }else if(valid){
            res.status(valid.status).end(valid.msg);console.log('_______2_______');
        }else{
            console.log('_______3_______');
            var token = jwt.sign({ email: user.email }, jwtSecret);
            res.send({ token: token, user: user });
        }
    });
});
app.post('/registration', function(req, res) {
    Users.registration(req.body, function(err, user){
        if(err){
            res.sendStatus(500);
        }else{
            var token = jwt.sign({ email: user.email }, jwtSecret);
            res.send({ token: token, user: user });
        }
    });
});


app.get('/get-users', function(req, res) {
    Users.getAllUsers(function(users) {
        res.json(users);
    });
});
app.post('/create', function(req, res) {
    Users.create(req.body, function(err, valid, insertedId) {
        if(err){
            res.sendStatus(500);
        }else if(valid){
            res.status(valid.status).end(valid.msg);
        }else{
            res.end(insertedId.toString());
        }
    });
});
app.put('/edit', function(req, res) {
    Users.update(req.body, function(err, valid) {
        if(err){
            res.sendStatus(500);
        }else if(valid){
            res.status(valid.status).end(valid.msg);
        }else{
            res.sendStatus(200);
        }
    });
});
app.delete('/delete/:id', function(req, res) {
    Users.delete(req.params.id, function(err, valid) {
        if(err){
            res.sendStatus(500);
        }else if(valid){
            res.status(valid.status).end(valid.msg);
        }else{
            res.sendStatus(200);
        }
    });
});

app.get('/me', function(req, res) {
    res.send(req.user);
});

db.connect('mongodb://127.0.0.1:27017/db', function (err) {
    if (err) console.error(err);
    else {
        app.listen(3000, function() {
            console.log('App listening on port 3000');
        });
    }
});




