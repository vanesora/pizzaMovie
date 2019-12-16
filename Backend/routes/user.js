'use strict';

var app = require('express')
var userController = require('../controllers/user')

var multipart = require('connect-multiparty');
var md_upload = multipart(
    {uploadDir : './uploads/user'}
    );
var api = app.Router();

api.post('/upload-picture-user/:id',
md_upload,userController.uploadPictureUser);
api.get('/upload-picture-user/:imageFile',
md_upload,userController.getPictureUser);

api.post('/usuario-login',userController.getUser);
api.post('/usuario',userController.setUser);
api.put('/usuario/:id',userController.updateUser);
api.delete('/usuario/:id',userController.deleteUser);

module.exports = api;