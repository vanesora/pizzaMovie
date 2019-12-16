'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    lastname: String,
    gender: String,
    email: String,
    picture: String,
    password: String,
    type: String,
    favorities: String,
    likes: String,
    reproduction: String,
})

module.exports = mongoose.model('user',userSchema);