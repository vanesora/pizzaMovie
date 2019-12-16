'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var chapterSchema = new Schema({
    title: String,
    type: String,
    picture: String,
    description: String,
    chapter: String,
})

module.exports = mongoose.model('chapter',chapterSchema);