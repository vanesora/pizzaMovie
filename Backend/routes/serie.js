'use strict';

var app = require('express');
var serieController = require('../controllers/serie');

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/series'
});
var api = app.Router();
api.get('/series',
    serieController.getSeries);
api.post('/upload-file-serie/:id',
    md_upload, serieController.UploadFileSerie);
api.get('/get-file-serie/:serieFile',
    md_upload, serieController.getFileSerie);
api.post('/upload-picture-serie/:id',
    md_upload, serieController.uploadPictureSerie);
api.get('/get-picture-serie/:imageSerie',
    md_upload, serieController.getPictureSerie);
// api.get('/get-top-serie/', serieController.getTopSeries);

api.post('/serie', serieController.setSerie);
api.put('/serie/:id',serieController.updateSerie);
api.delete('/serie/:id', serieController.deleteSerie);

module.exports = api;