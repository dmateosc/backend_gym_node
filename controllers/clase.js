//controlador de clases para comprobar las llamadas que se realizan y obtención de datos
//Controlador del clase (aqui van los metodos y todo lo que se vaya a realizar)
"use strict";

var Clase = require("../models/clase");
var User = require("../models/usuario");

var ClaseController = {
  //inicio getClase
  getClase: function (req, res) {
    var params = req.params.nombre;
    var nombreClase = params.nombre;

    Clase.find({ nombre: nombreClase }, (err, clases) => {
      if (err)
        return res.status(500).send({ message: "Error al obtener la clase." });

      if (!userStored)
        return res.status(404).send({ message: "La clase no existe." });

      return res.status(200).send({ clase: clases });
    });
  },
  createClase: function (req, res) {
    var body = req.body;
    var clase = new Clase();
    clase.nombre = body.nombre;
    if (body.instructor) {
      var instructores;
      body.instructor.forEach((values) => {
        var instructor = {
          nombre: values.nombre,
          _id: values._id,
        };
        instructores.push(instructor);
      });
    }
    clase.horarios = body.horarios;

    clase.save((err, claseStored) => {
      if (err) return res.status(500).send("Error al crear la clase");

      return res.status(200).send({ clase: clases });
    });
  },
};

module.exports = ClaseController;
