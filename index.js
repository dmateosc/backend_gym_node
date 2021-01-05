//Se encarga de la carga inicial de la aplicación, cargara la conexión a la base de datos y tendrá el servidor a la escucha
//de los diferentes servicios de fondo
"use strict";
const config = require('./config.js');
var mongoose = require("mongoose");
var app = require("./app");

var port = config.PORT;



mongoose.Promise = global.Promise;
mongoose
 /*  .connect("mongodb://127.0.0.1:28017/gym", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  }) */
  .connect(config.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log(
      "Conexión a la base de datos establecida satisfactoriamente... a", config.MONGO_CONNECT
    );

    // Creacion del servidor
    app.listen(port, () => {
      console.log("Servidor corriendo correctamente en la url:", config.HOST, config.PORT);
    });
  })
  .catch((err) => console.log(err));
