const express = require("express"); //turns the file into a webserver
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors"); //open the server to all the ips that we want, other computers can cnnect to our server
const bodyparser = require('body-parser'); //access to the body request
const mongoose = require("mongoose");
const app = express(); //express instance
const post = require("./models/posts");
const student = require("./models/posts");
const user = require("./models/posts");
const router = require('./routes/posts');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/posts", router);

mongoose.connect('mongodb://localhost:27017/testdb').then(() => {
    console.log("Connected to database!");
}).catch(() => {
    console.log("connection failed");
})

const port = 8080;
const protectedRoute = express.Router();

app.set('key', 'secret');

//authorization middleware
protectedRoute.use((req, res, next) => {
    const token = req.headers["access-token"];
    if(token){
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if(err){
                return res.send({'msg': 'Invalid token'});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.send({'msg':'Token not provided'});
    }
});

app.use(express.json()); //allows the requests in json
app.use(cors());

app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin","*"); //request header and body, header contains rules, body contains the data in a json
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS"); //methods allowed
    res.header("Access-Control-Allow-Headers","Content-Type"); //content type

    next();
});

//endpoints start here
//get to get public data
app.get('/api/hello', function(req, res){
    res.send({
        msg: 'hello?',
        content: 'random content'
    });
});



//send data to the server
app.post('/api/new', function(req, res){
    let body = req.body;
    res.send({
        msg: 'hello?',
        content: `user: ${body.username}`
    });
});
app.put('/api/put/:username', function(req, res){
    let username = req.params.username;
    res.send({
        msg: 'put',
        content: `nuevo put de: ${username}`
    });
})
app.delete('/api/delete/:username', function(req, res){
    let username = req.params.username;
    res.send({
        msg: 'delete',
        content: `user: ${username} deleted` 
    });
})
app.listen(port, function(){
    console.log('api is running')
});