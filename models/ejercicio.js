"use strict";

var {Schema, model}  = require("mongoose");


var Ejercicio = Schema({
  nombre: String,
  musculos: [String],
  imagenes: [String]
});

Ejercicio.method('toJSON', function(){
  const {__v, _id, ...ejercicios} = this.toObject();
  ejercicios.id = _id;
  return ejercicios;
})

module.exports = model("Ejercicio", Ejercicio);
