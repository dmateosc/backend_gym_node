"use strict";


var {Schema, model}  = require("mongoose");

var Musculo = Schema({
  nombre: String,
  imagenes: {
    fileName: String,
    key: String
  },
});

Musculo.method('toJSON', function(){
  const {__v, _id, ...musculos} = this.toObject();
  musculos.id = _id;
  return musculos;
})

module.exports = model("Musculo", Musculo);
