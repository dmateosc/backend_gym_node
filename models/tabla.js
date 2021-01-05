"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Tabla= new Schema({
  usuario: String,
  idUsuario: String,
  dias: [Date],
  ejercicios: [
    {
      ejercicio: {
        nombre: String
      },
      series: [
        {
          peso: Number,
          repeticiones: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Tabla", Tabla);
