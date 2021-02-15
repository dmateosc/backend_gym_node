//Controlador de Musculos, aqui se realizan todas las acciones que permitiran, obtener
//borrar, modificar y crear elementos
"use strict";
const Musculo = require("../models/musculo");

//permite crear un Musculo por su nombre
const getMusculo = async (req, res) => {
  var params = req.params;
  var nombreMusculo = params.nombre.toUpperCase();
  try {
    let musculos = await Musculo.findOne({ nombre: nombreMusculo });
    if (musculos) {
      res.status(200).json({
        musculos,
      });
    } else {
      res.status(404).json({ messageError: "No ha encontrado el registro" });
    }
  } catch (error) {
    return res.status(500).json({
      messageError: "Ha ocurrido un error al obtener el Musculo",
    });
  }
};
//permite obtener varios musculos
const getMusculos = async (req, res) => {
  try {
    let musculos = await Musculo.find({});
    if (!musculos) {
      res.status(404).json({ messageError: "No ha encontrado el registro" });
    } else {
      res.status(200).json({
        muscles: musculos,
      });
    }
  } catch (error) {
     res.status(500).json({
      messageError: "Ha ocurrido un error al obtener el Musculo",
    });
  }
};
//Crea un Musculo
const createMusculo = async (req, res) => {
  var body = req.body;
  var musculo = new Musculo();
  musculo.nombre = body.nombre;
  musculo.imagenes = [];
  try {
    let createdMuscle = await musculo.save();
    if (!createdMuscle) {
       res.status(400).json({
        message: "No se ha registrado el Musculo",
      });
    } else {
       res.status(200).json({
        Musculo: createdMuscle,
      });
    }
  } catch (error) {
     res.status(500).json({
      messageError: "Ha ocurrido un error al crear el Musculo",
    });
  }
};
var MusculoController = { getMusculo, getMusculos, createMusculo };
module.exports = MusculoController;
