"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Ejercicio = Schema({
  nombre: String,
  musculos: [String],
  imagenes: [String]
});
module.exports = mongoose.model("Ejercicio", Ejercicio);
