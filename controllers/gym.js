//Controlador del gym (aqui van los metodos y todo lo que se vaya a realizar)
"use strict";

var fs = require("fs");
var path = require("path");
var Musculo = require("../models/musculo");
var Ejercicio = require("../models/ejercicio");
var User = require("../models/usuario");
const { map } = require("../app");

var GymController = {
  uploadUserImage: function (req, res) {
    var projectId = req.params.id;
    var nickname = req.params.nickname;

    var fileName = req.file;
    var filePath = req.file.path;
    var fileSplit = filePath.split("\\");
    var fileName = fileSplit[1];
    var extSplit = fileName.split(".");
    var fileExt = extSplit[1];

    if (nickname) {
      User.updateOne(
        { nickname: nickname },
        {
          $set: { photo: fileName },
        },
        { new: true },
        (err, imageUpdated) => {
          if (err)
            return res.status(500).send("No se ha podido añadir la imagen");
          if (!imageUpdated)
            return res
              .status(404)
              .send({
                message:
                  "El ejercicio no existe y no se ha podido añadir la imagen",
              });

          return res.status(200).send({
            ejercicio: imageUpdated,
          });
        }
      );
    } else if (projectId) {
      Ejercicio.findByIdAndUpdate(
        projectId,
        {
          $set: { photo: fileName },
        },
        { new: true },
        (err, imageUpdated) => {
          if (err)
            return res.status(500).send("No se ha podido añadir la imagen");
          if (!imageUpdated)
            return res
              .status(404)
              .send({
                message:
                  "El ejercicio no existe y no se ha podido añadir la imagen",
              });

          return res.status(200).send({
            ejercicio: imageUpdated,
          });
        }
      );
    }
  },

  uploadEjercicioImage: function (req, res) {
    var projectId = req.params.id;
    var nombreEjercicio = req.params.nombre;

    var fileName = req.file;
    var filePath = req.file.path;
    var fileSplit = filePath.split("\\");
    var fileName = fileSplit[1];
    var extSplit = fileName.split(".");
    var fileExt = extSplit[1];

    if (nombreEjercicio) {
      Ejercicio.updateOne(
        { nombre: nombreEjercicio },
        {
          $push: { imagenes: fileName },
        },
        { new: true },
        (err, imageUpdated) => {
          if (err)
            return res.status(500).send("No se ha podido añadir la imagen");
          if (!imageUpdated)
            return res
              .status(404)
              .send({
                message:
                  "El ejercicio no existe y no se ha podido añadir la imagen",
              });

          return res.status(200).send({
            ejercicio: imageUpdated,
          });
        }
      );
    } else if (projectId) {
      Ejercicio.findByIdAndUpdate(
        projectId,
        {
          $push: { imagenes: fileName },
        },
        { new: true },
        (err, imageUpdated) => {
          if (err)
            return res.status(500).send("No se ha podido añadir la imagen");
          if (!imageUpdated)
            return res
              .status(404)
              .send({
                message:
                  "El ejercicio no existe y no se ha podido añadir la imagen",
              });

          return res.status(200).send({
            ejercicio: imageUpdated,
          });
        }
      );
    }
  },
  uploadMusculoImage: function (req, res) {
    var projectId = req.params.id;
    var nombreMusculo = req.params.nombre;

    var fileName = req.file;
    var filePath = req.file.path;
    var fileSplit = filePath.split("\\");
    var fileName = fileSplit[2];
    var extSplit = fileName.split(".");
    var fileExt = extSplit[1];
    if (nombreMusculo) {
      Musculo.updateOne(
        { nombre: nombreMusculo },
        {
          $push: { imagenes: fileName },
        },
        { new: true },
        (err, imageUpdated) => {
          if (err)
            return res.status(500).send("No se ha podido añadir la imagen");
          if (!imageUpdated)
            return res
              .status(404)
              .send({
                message:
                  "El músculo no existe y no se ha podido añadir la imagen",
              });

          return res.status(200).send({
            musculol: imageUpdated,
          });
        }
      );
    } else if (projectId) {
      Musculo.findByIdAndUpdate(
        projectId,
        {
          $push: { imagenes: fileName },
        },
        { new: true },
        (err, imageUpdated) => {
          if (err)
            return res.status(500).send("No se ha podido añadir la imagen");
          if (!imageUpdated)
            return res
              .status(404)
              .send({
                message:
                  "El músculo no existe y no se ha podido añadir la imagen",
              });

          return res.status(200).send({
            musculo: imageUpdated,
          });
        }
      );
    }
  },
  getImage: function(req,res){
    var file = req.params.image;
    var type = req.params.type;
    if (type == 'muscles') {
      var path_file = './uploads/muscles/'+file;
    }
    else if(type == 'exercise'){
      var path_file = './uploads/exercise/'+file;
    }else if(type == 'user'){
      var path_file = './uploads/user/'+file;
    }else{
      return res.status(400).send("No hay un tipo definido");
    }
		
		
		//se usa exists aunque este deprecated
		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});

  }
  
};

module.exports = GymController;
