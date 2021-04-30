//Controlador del gym (aqui van los metodos y todo lo que se vaya a realizar)
"use strict";

//No existe un actualizar usuario ya que el usuario no puede modificar algunos parametros
var User = require("../models/usuario");
var Clase = require("../models/clase");

//obtener usuario
const getUserById = async (req, res) => {
  var params = req.params;
  var id = params.id;
  try{
    let user = await User.findById(id);
    if (user) {
      res.status(200).send({
        user: user,
      });
    }
  }catch(err){
    res.status(500).send({message: 'Excepción no controlada'})
  }
  
  
};

//creamos usuarios
const createUser = async (req, res) => {
  var user = new User();
  //var clase = new Clase();

  var body = req.body;
  user.nickname = body.nickname;
  try {
    let userExist = await User.find({
      nickname: body.nickname,
      email: body.email,
    });
    if (userExist.length >= 1) {
      res.status(400).send("El usuario ya existe");
    } else {
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
      let userStored = await user.save();
      if (userStored) {
        res.status(200).send({ user: userStored });
      } else
        res
          .status(404)
          .send({ message: "No se ha podido guardar el usuario." });
    }
  } catch (err) {
    res.status(500).send({ message: "Error al guardar el usuario." });
  }
}; //fin createUser


//inicio getId
const login = async (req, res) => {
  var body = req.body;
  var nickname = body.nickname;
  var password = body.password;
  try {
    let user;
    if (nickname.includes("@")) {
      user = await User.findOne({ email: nickname, password: password });
    } else {
      user = await User.findOne({ nickname: nickname, password: password });
    }
    if (user) {
      res.status(200).send({ id: user._id });
    } else {
      res.status(401).send({ message: "El usuario no existe." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error en el servicio." });
  }
};
//Actualiza los datos del usuario
const updateStatusUser = (req, res) => {
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
    { nickname: nickname },
    {
      $set: { objetivo: objetivo, categoria: categoria },
      $push: {
        estado: estado,
      },
    }
  );
};
//Actualiza las clases del usuario
const updateClaseUser = (req, res) => {
  var body = req.body;
  var nickname = body.nickname;

  var clase = new Clase();
  clase.nombre = body.nombre;

  //Se actualizan los campos de estado
  User.updateOne(
    { nickname: nickname },
    {
      $push: {
        clase: clase,
      },
    }
  );
};

var UserController = {
  getUserById: getUserById,
  createUser: createUser,
  login: login,
  updateStatusUser: updateStatusUser,
  updateClaseUser: updateClaseUser,
};

module.exports = UserController;
