'use strict';

//trabajar con ficheros
var fs = require('fs');
var path = require('path');

var Chapter = require('../models/chapter')

function setChapter(req,res){
    var chapter = new Chapter();
    var params = req.body;

    chapter.title = params.title;
    chapter.type = params.type;
    chapter.description = params.description;
    
    chapter.save((err,chapterCreated)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!chapterCreated){
                res.status(200).send({
                    message:"no se pudo crear la cancion"
                })
            }else{
                res.status(200).send({
                    chapter:chapterCreated
                })
            }
        }
    })
}

function deleteChapter(req,res){
    var idChapter = req.params.id;

    Chapter.findByIdAndRemove(idChapter,(err,chapterRemoved)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!chapterRemoved){
                res.status(200).send({
                    message:"no se pudo eliminar la cancion"
                })
            }else{
                res.status(200).send({
                    chapter:chapterRemoved
                })
            }
        }
    })
}

function getChapters(req,res){
    Cancion.find((err,chapters)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!chapters){
                res.status(200).send({
                    message:"no se pudo obtener las películas"
                })
            }else{
                res.status(200).send({
                    chapters:chapters
                })
            }
        }
    })
}

function UploadFileChapter(req,res){
    var idChapter = req.params.id;
    var file_name = 'No subido...';

    //se valida si viene el archivo con la variable superglobal files
    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        //se obtiene nombre del archivo
        var file_name = file_split[2];

        //se obtiene extension fichero
        var exp_split = file_name.split('\.');
        var file_ext = exp_split[1];

        if(file_ext == 'mp4'){
            Chapter.findByIdAndUpdate(idChapter,{archivo:file_name},(err,updatedChapter)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!updatedChapter){
                        res.status(404).send({message:'No se ha podido actualizar la película'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        res.status(200).send({chapter:updatedChapter});
                    }
                }
            });
        }else{
            res.status(200).send({message:"Extension del archivo no correcta"});    
        }
    }else{
        res.status(200).send({message:"no ha subido ninguna película"});
    }
}

function getFileChapter(req,res){
    //nombre fichero
    var chapterFile = req.params.chapterFile;
    //ruta archivo 
    var path_file = './uploads/chapters/chapters/'+chapterFile;
    
    //se comprueba si existe
    fs.exists(path_file,function(exists){
        if(exists){
            //devolvemos la imagen
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:"no existe el fichero de video"});
        }
    });
}

function getAllChapters(req,res){

    Chapter.find().exec()
    .then((chapters)=>{
        if (!chapters) {
            res.status(404).send({ message: "Las películas no se ha cargado" });
        } else {
            res.status(200).send({canciones: chapters});
        }11
    }).catch(error =>{
        res.status(500).send({ message: "Error al cargar las películas" });
    })
}

function uploadPictureChapter(req,res){
    var idChapter = req.params.id;
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
            Chapter.findByIdAndUpdate(idChapter,{picture:file_name},(err,updatedChapter)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!updatedChapter){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        updatedChapter.picture = file_name;
                        res.status(200).send({usuario:updatedChapter});
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

function getPictureChapter(req,res){
        //nombre fichero
        var imageFile = req.params.imageFile;
        //ruta archivo 
        var path_file = './uploads/chapters/pictures/'+imageFile;
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
    setChapter,
    deleteChapter,
    getChapters,
    UploadFileChapter,
    getFileChapter,
    getAllChapters,
    uploadPictureChapter,
    getPictureChapter
};