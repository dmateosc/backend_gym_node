"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Clase = Schema({
  nombre: String,
  instructor: [
    {
      nombre: String,
    }
  ],
  horarios: [
    {
      hora: String,
      dia: Date,
      duracion: Number,
    }
  ],
});
module.exports = mongoose.model("Clase", Clase);
