//Se encarga de la carga inicial de la aplicación, cargara la conexión a la base de datos y tendrá el servidor a la escucha
//de los diferentes servicios de fondo
require("dotenv").config();
var express = require("express");

const cors = require("cors");

const { dbConnection } = require("./database/config");

const {listarBuckets} = require("./middlewares/aws-connect")

var app = express();

dbConnection();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


app.use(cors());

// rutas

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/gym"));



//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
