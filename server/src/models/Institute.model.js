const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    
    address : {
        type : String,
        trim : true,
    },

    logo : {
        type : String,
        default : null,
    }
},{ timestamps : true });

const Institute = mongoose.model("Institute", instituteSchema);
module.exports = Institute;