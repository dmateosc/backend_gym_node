"use strict";

var mongoose = require("mongoose");
var Clase = require("./clase");
var Schema = mongoose.Schema;

var Usuario = Schema({
  uid: String,
  nickname: String,
  password: String,
  photo: String,
  nombre: String,
  apellidos: String,
  dni: String,
  edad: Number,
  email: String,
  categoria: [String],
  estado: [
    {
      //Objeto Estado
      fecha: Date,
      peso: Number,
      masa_corporal: String,
      musculo: String,
      grasa: String,
      grasa_visceral: String,
    },
  ],
  objetivo: String,
  entrenador: {
    id_entrenador: String,
    nombre_entrenador: String,
  },
  clases: [
    //objeto Clases
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clase",
    },
  ],
  pagos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pagos",
    },
  ],
  active: Boolean,
  entrenamientos: [String]
});

module.exports = mongoose.model("User", Usuario);
