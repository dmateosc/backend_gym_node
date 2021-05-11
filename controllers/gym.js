//Controlador del gym (aqui van los metodos y todo lo que se vaya a realizar)
"use strict";

var fs = require("fs");
var path = require("path");
var Musculo = require("../models/musculo");
var Ejercicio = require("../models/ejercicio");
var User = require("../models/usuario");
const { s3 } = require("../middlewares/aws-connect");
const { response } = require("express");

//metodo para subir la imagen de un usuario
const uploadUserImage = async (req, res) => {
  var projectId = req.params.id;
  var nickname = req.params.nickname;

  var fileOriginalName = req.file.originalname;

  var fileName = req.file.key;

  if (nickname) {
    try {
      const imageUpdated = await User.updateOne(
        { nickname: nickname },
        {
          $set: {
            imagenes: {
              fileName: fileOriginalName,
              key: fileName,
            },
          },
        },
        { new: true }
      );
      if (!imageUpdated)
        return res.status(404).send({
          message: "El ejercicio no existe y no se ha podido añadir la imagen",
        });

      return res.status(200).send({
        ejercicio: imageUpdated,
      });
    } catch (error) {
      return res.status(500).send("No se ha podido añadir la imagen");
    }
  } else if (projectId) {
    try {
      const imageUpdated = await Ejercicio.findByIdAndUpdate(
        projectId,
        {
          $set: { photo: fileName },
        },
        { new: true }
      );

      if (!imageUpdated)
        return res.status(404).send({
          message: "El ejercicio no existe y no se ha podido añadir la imagen",
        });

      return res.status(200).send({
        ejercicio: imageUpdated,
      });
    } catch (error) {
      return res.status(500).send("No se ha podido añadir la imagen");
    }
  }

  //subir la imagen en Base64 o bien subirla a una plataforma y de esa plataforma obtener la url
};

//Metodo para subir imagens de ejercicio //a futuro sera en base64 por comodidad
const uploadEjercicioImage = async (req, res) => {
  var projectId = req.params.id;
  var nombreEjercicio = req.params.nombre;

  var fileOriginalName = req.file.originalname;

  var fileName = req.file.key;

  //comprobamos si viene el nombre del ejercicio
  if (nombreEjercicio) {
    try {
      const imageUpdated = await Ejercicio.updateOne(
        { nombre: nombreEjercicio },
        {
          $push: {
            imagenes: {
              fileName: fileOriginalName,
              key: fileName,
            },
          },
        },
        { new: true }
      );

      if (!imageUpdated)
        return res.status(404).send({
          message: "El ejercicio no existe y no se ha podido añadir la imagen",
        });

      return res.status(200).send({
        ejercicio: imageUpdated,
      });
    } catch (error) {
      return res.status(500).send("No se ha podido añadir la imagen");
    }

    //comprobamos el projectId para actualizar
  } else if (projectId) {
    try {
      const imageUpdated = await Ejercicio.findByIdAndUpdate(
        projectId,
        {
          $push: {
            imagenes: {
              fileName: fileOriginalName,
              key: fileName,
            },
          },
        },
        { new: true }
      );

      if (!imageUpdated)
        return res.status(404).send({
          message: "El ejercicio no existe y no se ha podido añadir la imagen",
        });

      return res.status(200).send({
        ejercicio: imageUpdated,
      });
    } catch (error) {
      return res.status(500).send("No se ha podido añadir la imagen");
    }
  }
};

//metodo para actualizar la imagen del musculo
const uploadMusculoImage = async (req, res) => {
  var projectId = req.params.id;
  var nombreMusculo = req.params.nombre;

  try {
    var fileOriginalName = req.file.originalname;

    var fileName = req.file.key;

    if (nombreMusculo) {
      const imageUpdated = await Musculo.updateOne(
        { nombre: nombreMusculo.toUpperCase() },
        {
          imagenes: {
            fileName: fileOriginalName,
            key: fileName,
          },
        },
        { new: false }
      );
      if (!imageUpdated)
        return res.status(404).send({
          message: "El músculo no existe y no se ha podido añadir la imagen",
        });

      return res.status(200).send({
        musculo: imageUpdated.data,
      });
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
            return res.status(404).send({
              message:
                "El músculo no existe y no se ha podido añadir la imagen",
            });

          return res.status(200).send({
            musculo: imageUpdated,
          });
        }
      );
    }
  } catch (error) {
    return res.status(500).send("No se ha podido añadir la imagen");
  }
};

const getImage = async (req, res = response) => {
  var file = req.params.image.toUpperCase();
  var type = req.params.type;

  var key;

  try {
    var data;
    if (type == "muscles") {
      var path_file = "gym-file-storage/upload/muscles";

      key = await Musculo.findOne({ nombre: file });

      data = await s3
        .getObject({
          Bucket: path_file,
          Key: key.imagenes.key,
        })
        .promise();
    } else if (type == "exercise") {
      var path_file = "gym-file-storage/upload/exercises";

      key = await Ejercicio.findOne({
        nombre: file,
      });

      data = await s3
        .getObject({
          Bucket: path_file,
          Key: key.imagenes[0],
        })
        .promise();
    } else if (type == "user") {
      var path_file = "gym-file-storage/upload/user";

      key = await User.find({ nombre: file });
    } else {
      return res.status(400).send("No hay un tipo definido");
    }

    // res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.write(data.Body, "binary");
    res.end(null, "binary");

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  uploadUserImage,
  uploadEjercicioImage,
  uploadMusculoImage,
  getImage,
};
