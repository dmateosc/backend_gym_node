//Controlador del gym (aqui van los metodos y todo lo que se vaya a realizar)
"use strict";


//No existe un actualizar usuario ya que el usuario no puede modificar algunos parametros
var User = require("../models/usuario");
var Clase = require("../models/clase");

var UserController = {
  //obtener usuario
  getUserById: function (req, res) {
    var params = req.params;
    var id = params.id;
    User.find({_id: id}, (err, user) => {
      if (user) {
        return res.status(200).send({
          user: user,
        });
      }
    });
  },

   //obtener usuario
   getUser: function (req, res) {
    var body = req.body;
    var uid = params.body;
    User.find({uid: uid }, (err, user) => {
      if (user) {
        return res.status(200).send({
          user: user,
        });
      }
    });
  },

  //creamos usuarios
  createUser: function (req, res) {
    var user = new User();
    //var clase = new Clase();

    var body = req.body;
    user.nickname = body.nickname;
    User.find(
      { nickname: body.nickname, email: body.email, uid: body.uid },
      (err, userExist) => {
        if (userExist.length >= 1) {
          return res.status(400).send("El usuario ya existe");
        } else {
          user.uid = body.uid;

          user.nombre = body.nombre;
          user.password = body.password;
          user.apellidos = body.apellidos;
          user.dni = body.apellidos || "";
          user.edad = body.edad;
          user.email = body.email;

          if (body.categoria) {
            body.categoria.forEach((element) => {
              user.categoria.push(element);
            });
          }
          user.entrenador = "";
          user.estado = [];
          user.objetivo = body.objetivo;
          user.clases = [];
          user.pagos = [];
          user.active = true;
          user.entrenamientos = [];
          user.save((err, userStored) => {
            if (err)
              return res
                .status(500)
                .send({ message: "Error al guardar el usuario." });

            if (!userStored)
              return res
                .status(404)
                .send({ message: "No se ha podido guardar el usuario." });

            return res.status(200).send({ user: userStored });
          });
        }
      }
    );
  }, //fin createUser
  //inicio getId
  login: function (req, res) {
    var body = req.body;
    var nickname = body.nickname;
    var password = body.password;

    User.findOne(
      { nickname: nickname, password: password },
      (err, userLoged) => {
        if (err)
          return res.status(500).send({ message: "Error en el servicio." });

        if (!userLoged)
          return res.status(401).send({ message: "El usuario no existe." });

        return res.status(200).send({ uid: userLoged.uid });
      }
    );
  },
  //Actualiza los datos del usuario
  updateStatusUser: function (req, res) {
    var body = req.body;
    var nickname = body.nickname;
    var objetivo = body.objetivo;
    var categoria = body.categoria;
    if (body.estado) {
      var estado = {
        fecha: Date.now(),
        peso: body.estado.peso,
        masa_coporal: body.estado.masa_coporal,
        musculo: body.estado.musculo,
        grasa: body.estado.grasa,
        grasa_visceral: body.estado.grasa_visceral,
      };
    }

    //Se actualizan los campos de estado
    User.updateOne(
      { uid: uid },
      {
        $set: { objetivo: objetivo, categoria: categoria },
        $push: {
          estado: estado,
        },
      }
    );
  },
  //Actualiza las clases del usuario
  updateClaseUser: function (req, res) {
    var body = req.body;
    var uid = body.uid;

    var clase = new Clase();
    clase.nombre = body.nombre;

    //Se actualizan los campos de estado
    User.updateOne(
      { uid: uid },
      {
        $push: {
          clase: clase,
        },
      }
    );
  },
};

module.exports = UserController;
