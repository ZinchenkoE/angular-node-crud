var express    = require('express');
var bodyParser = require('body-parser');
var jwt        = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var app        = express();
var db         = require('./db');
var Users      = require('./model/users');
const jwtSecret = 'dsfasf43w3f43f3f;lkv';

const userAdmin = { username: 'admin', password: '12345' };

function authenticate(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.status(400).end('Логин и пароль обязательны к заполнению');
    }
    if(req.body.username !== userAdmin.username || req.body.password !== userAdmin.password) {
        res.status(401).end('Логин и/или пароль неверны');
    }
    next();
}
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({path: ['/login']})); // декодирование jwt

app.post('/login', authenticate, function(req, res) {
    var token = jwt.sign({ username: userAdmin.username }, jwtSecret);
    res.send({ token: token, user: userAdmin });
});

app.get('/get-users', function(req, res) {
    Users.getAllUsers(function(users) {
        res.json(users);
    });
    console.log(555);
});

app.post('/create', function(req, res) {
    Users.create(req.body, function(err, insertedId) {
        if(err){
            res.sendStatus(500);
        }else{
            res.end(insertedId.toString());
        }
    });
});
app.put('/edit', function(req, res) {
    Users.update(req.body, function(err) {
        if(err){
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });
});
app.delete('/delete/:id', function(req, res) {
    Users.delete(req.params.id, function(err) {
        if(err){
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });
});

// app.get('/me', function(req, res) {
//     res.send(req.user);
// });

db.connect('mongodb://127.0.0.1:27017/db', function (err) {
    if (err) console.error(err);
    else {
        app.listen(3000, function() {
            console.log('App listening on port 3000');
        });
    }
});




