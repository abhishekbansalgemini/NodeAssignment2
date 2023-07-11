const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : String,
    gender : String,
    email : String,
    number : Number,
    category : String,
    tech : [String],
    profileImage : String
})

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
