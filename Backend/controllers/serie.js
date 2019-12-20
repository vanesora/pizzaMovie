'use strict';

//trabajar con ficheros
var fs = require('fs');
var path = require('path');

var Serie = require('../models/serie')

function setSerie(req,res){
    var serie = new Serie();
    var params = req.body;

    serie.title = params.title;
    serie.type = params.type;
    serie.description = params.description;
    serie.dateAdd = params.dateAdd
    serie.seasonNumber = params.seasonNumber
    serie.save((err,serieCreated)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!serieCreated){
                res.status(200).send({
                    message:"no se pudo crear la cancion"
                })
            }else{
                res.status(200).send({
                    serie:serieCreated
                })
            }
        }
    })
}

function deleteSerie(req,res){
    var idSerie = req.params.id;

    Serie.findByIdAndRemove(idSerie,(err,serieRemoved)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!serieRemoved){
                res.status(200).send({
                    message:"no se pudo eliminar la cancion"
                })
            }else{
                res.status(200).send({
                    serie:serieRemoved
                })
            }
        }
    })
}

function getSeries(req,res){
    Serie.find((err,series)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!series){
                res.status(200).send({
                    message:"no se pudo obtener las series"
                })
            }else{
                res.status(200).send({
                    series:series
                })
            }
        }
    })
}

function UploadFileSerie(req,res){
    var idSerie = req.params.id;
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
            Serie.findByIdAndUpdate(idSerie,{archivo:file_name},(err,updatedSerie)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!updatedSerie){
                        res.status(404).send({message:'No se ha podido actualizar la película'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        res.status(200).send({serie:updatedSerie});
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

function getFileSerie(req,res){
    //nombre fichero
    var serieFile = req.params.serieFile;
    //ruta archivo 
    var path_file = './uploads/series/'+serieFile;
    
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

function getAllSeries(req,res){

    Serie.find().exec()
    .then((series)=>{
        if (!series) {
            res.status(404).send({ message: "Las películas no se han cargado" });
        } else {
            res.status(200).send({canciones: series});
        }11
    }).catch(error =>{
        res.status(500).send({ message: "Error al cargar las seríes" });
    })
}

function updateSerie(req,res){
    var idSerie = req.params.id;
    var updateMSerie = req.body;
    Serie.findByIdAndUpdate(idSerie,updateSerie,(err,_updateSerie)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!_updateSerie){
                res.status(200).send({
                    message:"no se pudo actualizar la serie"
                })
            }else{
                res.status(200).send({
                    serie:updateSerie
                })
            }
        }
    })

}

function uploadPictureSerie(req,res){
    var idSerie = req.params.id;
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
            Serie.findByIdAndUpdate(idSerie,{picture:file_name},(err,updatedSerie)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!updatedSerie){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        updatedSerie.picture = file_name;
                        res.status(200).send({usuario:updatedSerie});
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

function getPictureSerie(req,res){
        //nombre fichero
        var imageFile = req.params.imageFile;
        //ruta archivo 
        var path_file = './uploads/series/pictures/'+imageFile;
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
    setSerie,
    deleteSerie,
    getSeries,
    UploadFileSerie,
    getFileSerie,
    getAllSeries,
    uploadPictureSerie,
    getPictureSerie,
    updateSerie
};