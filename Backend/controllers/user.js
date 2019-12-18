'use strict';

//trabajar con ficheros
var fs = require('fs');
var path = require('path');

var User = require('../models/user');

function setUser(req,res){
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.lastName = params.lastName;
    user.gender = params.gender;
    user.type = "USER_FREE"; 
    user.email = params.email;
    user.password = params.password;

    user.save((err,userCreated)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!userCreated){
                res.status(200).send({
                    message:"no se pudo crear el usuario"
                })
            }else{
                res.status(200).send({
                    user:userCreated
                })
            }
        }
    })
}

function getUser(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email:email.toLowerCase()},
    (err,user)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!user){
                res.status(200).send({
                    message:"no existe usuario con el correo indicado"
                })
            }else{
                if(user.password != password){
                    res.status(200).send({
                      message:"contraseña errada"
                    })
                }else{
                    res.status(200).send({
                        user:user
                    })
                }
            }
        }
    })
}

function updateUser(req,res){
    var idUser = req.params.id;
    var updateUser = req.body;

    User.findByIdAndUpdate(idUser,updateUser,(err,updatedUser)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!updatedUser){
                res.status(200).send({
                    message:"no se pudo actualizar el usuario"
                })
            }else{
                res.status(200).send({
                    user:updatedUser
                })
            }
        }
    })

}

function deleteUser(req,res){
    var idUser = req.params.id;
    
    Usuario.findByIdAndRemove(idUser,(err,userDeleted)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!userDeleted){
                res.status(200).send({
                    message:"no se pudo eliminar el usuario"
                })
            }else{
                res.status(200).send({
                    user:userDeleted
                })
            }
        }
    })
}


function uploadPictureUser(req,res){
    var idUser = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            User.findByIdAndUpdate(idUser,{picture:file_name},(err,updatedUser)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!updatedUser){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        updatedUser.picture = file_name;
                        res.status(200).send({usuario:updatedUser});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Extension del archivo no correcta"});    
        }
    }else{
        res.status(200).send({message:"no ha subido ninguna imagen"});
    }
}

function getPictureUser(req,res){
        //nombre fichero
        var imageFile = req.params.imageFile;
        //ruta archivo 
        var path_file = './uploads/user/'+imageFile;
        //se comprueba si existe
        fs.exists(path_file,function(exists){
            if(exists){
                //devolvemos la imagen
                res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send(
                    {message:"no existe imagen"});
            }
        });
}

module.exports = {
    setUser,
    getUser,
    updateUser,
    deleteUser,
    uploadPictureUser,
    getPictureUser
};
