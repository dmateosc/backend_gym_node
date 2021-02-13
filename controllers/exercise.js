//Controlador de ejercicios, aqui se realizan todas las acciones que permitiran, obtener
//borrar, modificar y crear elementos
"use strict";
const Ejercicio = require("../models/ejercicio");

//permite obtener un ejercicio por su nombre
const getEjercicio = async (req, res) => {
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
      ejercicios,
    });
  });
};
//permite obtener un ejercicio por nombre de musculo
const getEjercicioByMuscle = async (req, res) => {
  var { muscle } = req.params;

  try {
    var ejercicios = await Ejercicio.find({
      musculos: muscle.toUpperCase(),
    });
    if (ejercicios) {
      res.status(200).json({
        ejercicios,
      });
    } else {
      res.status(404).json({ messageError: "No ha encontrado el registro" });
    }
  } catch (error) {
    res.status(500).json({
      messageError: "Ha ocurrido un error al obtener el ejercicio",
    });
  }
};
//Crea un ejercicio
const createEjercicio = async (req, res) => {
  var body = req.body;
  body = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    musculos: body.musculos.toUpperCase(),
  };
  var ejercicio = new Ejercicio(req.body);
  ejercicio.imagen = [];
  try {
    ejercicio = await ejercicio.save();
    if (ejercicio) {
      res.status(200).json({
        ejercicio: createdExercise,
      });
    } else {
      res.status(400).json({
        message: "No se ha registrado el ejercicio",
      });
    }
  } catch (error) {
    res.status(500).json({
      messageError: "Ha ocurrido un error al crear el ejercicio",
    });
  }
};
//Crea varios ejercicios
const createEjercicios = async (req, res) => {
  var body = req.body;
  var ejerciciosCreados = [];
  var c = 0;

  body.forEach(async (element) => {
    try {
      var ejercicio = new Ejercicio({
        ...element,
        nombre: element.nombre.toUpperCase(),
        musculos: element.musculos.map((e) => e.toUpperCase()),
      });
      ejercicio = await ejercicio.save();
      if (ejercicio) {
        ejerciciosCreados.push(ejercicio);
        c++;
      } else {
        return res.status(400).send({
          message: "No se ha registrado el ejercicio",
        });
      }
      if (c == body.length) {
        res.status(200).send({
          ejercicio: ejerciciosCreados,
        });
      }
    } catch (error) {
      return res.status(500).send({
        messageError: "Ha ocurrido un error al crear el ejercicio",
      });
    }
  });
};

var EjercicioController = {
  getEjercicio,
  getEjercicioByMuscle,
  createEjercicio,
  createEjercicios,
};
module.exports = EjercicioController;
