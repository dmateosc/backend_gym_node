//Controlador de Musculos, aqui se realizan todas las acciones que permitiran, obtener
//borrar, modificar y crear elementos
"use strict";
const Musculo = require("../models/musculo");

var MusculoController = {
  //permite crear un Musculo por su nombre
  getMusculo: function (req, res) {
    var params = req.params;
    var nombreMusculo = params.nombre.toUpperCase();

    Musculo.findOne({ nombre: nombreMusculo }, (err, musculos) => {
      if (err)
        return res.status(500).send({
          messageError: "Ha ocurrido un error al obtener el Musculo",
        });

      if (!musculos)
        return res
          .status(404)
          .send({ messageError: "No ha encontrado el registro" });

      return res.status(200).send({
        musculos: musculos,
      });
    });
  },
  //permite obtener varios musculos
  getMusculos: function (req, res) {
    
    Musculo.find({}).exec((err, musculos) => {
      if (err)
        return res.status(500).send({
          messageError: "Ha ocurrido un error al obtener el Musculo",
        });

      if (!musculos)
        return res
          .status(404)
          .send({ messageError: "No ha encontrado el registro" });

      return res.status(200).send({
        muscles: musculos,
      });
    });
  },
  //Crea un Musculo
  createMusculo: function (req, res) {
    var body = req.body;
    var musculo = new Musculo();
    musculo.nombre = body.nombre;
    musculo.imagenes = [];

    musculo.save((err, createdMuscle) => {
      if (err)
        return res.status(500).send({
          messageError: "Ha ocurrido un error al crear el Musculo",
        });
      if (!createdMuscle)
        return res.status(400).send({
          message: "No se ha registrado el Musculo",
        });

      return res.status(200).send({
        Musculo: createdMuscle,
      });
    });
  },
};
module.exports = MusculoController;
