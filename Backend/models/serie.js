'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var serieSchema = new Schema({
    title: String,
    type: String,
    picture: String,
    description: String,
    seasonNumber: Number,
    dateAdd: String,
    archivo: String,
    seasons: [{
        chaptersNumber: Number,
        chapters:[String]
    }]
})

module.exports = mongoose.model('serie', serieSchema);