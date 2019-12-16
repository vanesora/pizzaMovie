'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var puerto = 3977;

mongoose.connect("mongodb://localhost:27017/pizzaMovie",(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa a bd pizzaMovie");
        app.listen(puerto,()=>{
            console.log("servidor escuchando en el puerto "+puerto)
        })
    }
})