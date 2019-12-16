'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    type: String,
    picture: String,
    description: String,
    movie: String,
    numberRepreduction: Number,
})

module.exports = mongoose.model('movie',movieSchema);