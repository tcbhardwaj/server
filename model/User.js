const mongoose = require('mongoose');
//const Schema = mongoose.Schema
const { Schema  } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String
});

mongoose.model('users', userSchema);    // this create user schema in mongo db