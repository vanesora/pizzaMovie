'use strict';

var app = require('express');
var movieController = require('../controllers/movie');

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/movies'
});
var api = app.Router();
api.get('/movies',
    movieController.getMovies);
api.post('/upload-file-movie/:id',
    md_upload, movieController.uploadFileMovie);
api.get('/get-file-movie/:movieFile',
    md_upload, movieController.getFileMovie);
api.post('/upload-picture-movie/:id',
    md_upload, movieController.uploadPictureMovie);
api.get('/get-picture-movie/:imageFile',
    md_upload, movieController.getPictureMovie);
api.get('/get-top/', movieController.getTopMovies);

api.post('/movie', movieController.setMovie);
api.delete('/movie/:id', movieController.deleteMovie);

module.exports = api;