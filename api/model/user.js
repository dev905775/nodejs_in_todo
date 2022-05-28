const mongoose = require("mongoose");
userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    password:String,
    cpassword:String,
    // userType:String
})

module.exports = mongoose.model('user', userSchema);