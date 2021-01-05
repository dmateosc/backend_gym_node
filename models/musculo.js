"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Musculo = Schema({
  nombre: String,
  imagenes: [String],
});
module.exports = mongoose.model("Musculo", Musculo);
