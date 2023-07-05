const express = require('express');
const port = 9651;

const app = express();
const path = require('path');

app.set('view engine','ejs');
app.set('view',path.join(__dirname,'view'));

const db = require('./confing/mongoose');
const jwt = require('./confing/passport-jwt-token');
const stjwt = require('./confing/passport-jwt-studenttoken');
const cookieparser = require('cookie-parser');
const session = require('express-session');

app.use(express.urlencoded());
app.use(cookieparser());

app.use(session({
    secret : 'faculty',
    name : 'register',
    saveUninitialized : false,
    resave : false,
    cookie :{
        maxAge : 1000*60*60*24
    }
}))

app.use('/',require('./rotues'));

app.listen(port,(err)=>{
    if(err){
        console.log("sever is not start");
        return false;
    }
    console.log("Sever Is Working :- "+port);
})