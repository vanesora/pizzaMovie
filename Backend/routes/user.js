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
api.get('/get-picture-user/:imageFile',
md_upload,userController.getPictureUser);

api.post('/user-login',userController.getUser);
api.post('/user',userController.setUser);
api.put('/user/:id',userController.updateUser);
api.delete('/user/:id',userController.deleteUser);

module.exports = api;