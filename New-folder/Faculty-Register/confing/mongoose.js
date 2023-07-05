const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/try");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"DB Not Connected"));

db.once('open',(err)=>{
    if(err){
        console.log("DB Not Start");
        return false;
    }
    console.log("DB Is Start");
});

module.exports = db;