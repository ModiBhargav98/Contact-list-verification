const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"]
    },
    contacts:[{
        type:String,
        require:true
    }]
})

module.exports = mongoose.model("user",userSchema)