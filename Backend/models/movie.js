'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    release_year: Number,
    duration: Number,
    category: Array,
    directed_by: String,
    casting: Array,
    description: String,
    trailer: String,
    picture: String,
    numberReproduction: Number,
    dateAdd: String
})

module.exports = mongoose.model('movie',movieSchema);