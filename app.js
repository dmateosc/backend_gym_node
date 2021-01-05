//Se encarga de cargar todos los servicios
"use strict";

var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

// cargar archivos rutas
var gym_routes = require("./routes/gym");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// rutas
app.use("/api", gym_routes);

// exportar
module.exports = app;
