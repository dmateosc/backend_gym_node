//Controlador de ejercicios, aqui se realizan todas las acciones que permitiran, obtener
//borrar, modificar y crear elementos
"use strict";
const Ejercicio = require("../models/ejercicio");

var EjercicioController = {
  //permite obtener un ejercicio por su nombre
  getEjercicio: function (req, res) {
    var params = req.body;
    var nombreEjercicio = params.nombre.toUpperCase();

    Ejercicio.findOne({ nombre: nombreEjercicio }, (err, ejercicios) => {
      if (err)
        return res.status(500).send({
          messageError: "Ha ocurrido un error al obtener el ejercicio",
        });

      if (!ejercicios)
        return res
          .status(404)
          .send({ messageError: "No ha encontrado el registro" });

      return res.status(200).send({
        ejercicios: ejercicios,
      });
    });
  },
  //permite obtener un ejercicio por nombre de musculo
  getEjercicioByMuscle: function (req, res) {
    var params = req.params;
    var musculos = params.muscle;

    Ejercicio.find(
      {
        "musculos": {
          $all: musculos
        },
      },
      (err, ejercicios) => {
        if (err)
          return res.status(500).send({
            messageError: "Ha ocurrido un error al obtener el ejercicio",
          });

        if (!ejercicios)
          return res
            .status(404)
            .send({ messageError: "No ha encontrado el registro" });

        return res.status(200).send({
          ejercicios: ejercicios,
        });
      }
    );
  },
  //Crea un ejercicio
  createEjercicio: function (req, res) {
    var body = req.body;
    var ejercicio = new Ejercicio();
    ejercicio.nombre = body.nombre.toUpperCase();
    ejercicio.musculos = body.musculos.toUpperCase();
    ejercicio.imagen = [];

    ejercicio.save((err, createdExercise) => {
      if (err)
        return res.status(500).send({
          messageError: "Ha ocurrido un error al crear el ejercicio",
        });
      if (!createdExercise)
        return res.status(400).send({
          message: "No se ha registrado el ejercicio",
        });

      return res.status(200).send({
        ejercicio: createdExercise,
      });
    });
  },
  //Crea varios ejercicios
  createEjercicios: function (req, res) {
    var body = req.body;
    var ejerciciosCreados = [];
    var c = 0;
    
     body.forEach(element => {
        var ejercicio = new Ejercicio();
        ejercicio.nombre = element.nombre.toUpperCase();
        ejercicio.musculos = element.musculos.map(musculos => musculos.toUpperCase());
        ejercicio.imagenes = element.imagenes;
        console.debug("El ejercicio a crear es " + ejercicio);
        ejercicio.save((err, createdExercise) => {
          if (err)
            return res.status(500).send({
              messageError: "Ha ocurrido un error al crear el ejercicio",
            });
          if (!createdExercise)
            return res.status(400).send({
              message: "No se ha registrado el ejercicio",
            });
          c++;
          ejerciciosCreados.push(createdExercise);
          console.debug("Los ejercicios creados son " + ejerciciosCreados);
          if(c == body.length){
            return  res.status(200).send({
              ejercicio: ejerciciosCreados,
            })
          }
        });
      })
      
  },
};
module.exports = EjercicioController;
