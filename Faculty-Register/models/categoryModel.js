const mongoose = require('mongoose');

const categoryschema  = mongoose.Schema({

    F_name:{
        type:String,
        required : true
    }

});
const category = mongoose.model('category',categoryschema);
module.exports = category;