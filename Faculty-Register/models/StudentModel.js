const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    S_name : {
        type : String,
        require : true
    },
    S_email : {
        type : String,
        require : true
    },
    S_password : {
        type : String,
        require : true
    },
    S_phone : {
        type : Number,
        require : true
    },
    S_city : {
        type : String,
        require : true
    },
    S_course :{
        type : String,
        require : true
    },
    S_fees :{
        type : Number,
        require : true
    },
    F_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    F_name : {
        type : mongoose.Schema.Types.String,
        ref : 'category'
    }
});

const Admin = mongoose.model('studentregister',AdminSchema);
module.exports = Admin;