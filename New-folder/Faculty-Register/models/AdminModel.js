const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    F_name : {
        type : String,
        require : true
    },
    F_email : {
        type : String,
        require : true
    },
    F_password : {
        type : String,
        require : true
    },
    F_phone : {
        type : Number,
        require : true
    },
    F_designation : {
        type : String,
        require : true
    },
    F_city : {
        type : String,
        require : true
    }
});

const Admin = mongoose.model('trythis',AdminSchema);
module.exports = Admin;