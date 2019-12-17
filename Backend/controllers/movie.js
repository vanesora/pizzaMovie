'use strict';

//trabajar con ficheros
var fs = require('fs');
var path = require('path');

var Movie = require('../models/movie')

function setMovie(req,res){
    var movie = new Movie();
    var params = req.body;

    movie.title = params.title;
    movie.type = params.type;
    movie.description = params.description;
    
    movie.save((err,movieCreated)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!movieCreated){
                res.status(200).send({
                    message:"no se pudo crear la película"
                })
            }else{
                res.status(200).send({
                    movie:movieCreated
                })
            }
        }
    })
}

function deleteMovie(req,res){
    var idMovie = req.params.id;

    Movie.findByIdAndRemove(idMovie,(err,movieRemoved)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!movieRemoved){
                res.status(200).send({
                    message:"no se pudo eliminar la cancion"
                })
            }else{
                res.status(200).send({
                    movie:movieRemoved
                })
            }
        }
    })
}

function getMovies(req,res){
    Cancion.find((err,movies)=>{
        if(err){
            res.status(500).send({
                message:"error en el servidor"
            })
        }else{
            if(!movies){
                res.status(200).send({
                    message:"no se pudo obtener las películas"
                })
            }else{
                res.status(200).send({
                    movies:movies
                })
            }
        }
    })
}

function uploadFileMovie(req,res){
    var idMovie = req.params.id;
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
            Movie.findByIdAndUpdate(idMovie,{movie:file_name},(err,updatedMovie)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!updatedMovie){
                        res.status(404).send({message:'No se ha podido actualizar la película'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        res.status(200).send({movie:updatedMovie});
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

function getFileMovie(req,res){
    //nombre fichero
    var movieFile = req.params.movieFile;
    //ruta archivo 
    var path_file = './uploads/movies/'+movieFile;
    
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

function getAllMovies(req,res){

    Movie.find().exec()
    .then((movies)=>{
        if (!movies) {
            res.status(404).send({ message: "Las películas no se ha cargado" });
        } else {
            res.status(200).send({movies: movies});
        }11
    }).catch(error =>{
        res.status(500).send({ message: "Error al cargar las películas" });
    })
}

function uploadPictureMovie(req,res){
    var idMovie = req.params.id;
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
            Movie.findByIdAndUpdate(idMovie,{picture:file_name},(err,updatedMovie)=>{
                if(err){
                    res.status(500).send({message:'Error en el servidor'});
                }else{
                    if(!updatedMovie){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        //devuelve usuario antes de actualizarse
                        updatedMovie.picture = file_name;
                        res.status(200).send({usuario:updatedMovie});
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

function getPictureMovie(req,res){
        //nombre fichero
        var imageFile = req.params.imageFile;
        //ruta archivo 
        var path_file = './uploads/movies/'+imageFile;
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
    setMovie,
    deleteMovie,
    getMovies,
    uploadFileMovie,
    getFileMovie,
    getAllMovies,
    uploadPictureMovie,
    getPictureMovie
};