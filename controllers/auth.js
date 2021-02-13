const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { nickname, email, password } = req.body;
  try {
    let usuario = await User.findOne({ email });
    let usuarioNickname = await User.findOne({ nickname });

    if (usuario || usuarioNickname) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese correo",
      });
    } else {
      usuario = new User(req.body);
      console.log(usuario);
      //Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      await usuario.save();

      //Generar JWT
      const token = await generarJWT(usuario.id, usuario.name);

      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: "false",
      msg: "error en el sistema",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { nickname, email, password } = req.body;

  try {
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    passwordValidation = bcrypt.hashSync(password, salt);

    if (nickname.includes("@")) {
      var usuarioEmail = nickname && (await User.findOne({ email: nickname }));
    } else {
      var usuarioEmail = email && (await User.findOne({ email }));
      var usuarioNickname = nickname && (await User.findOne({ nickname }));
    }
    if (usuarioEmail) {
      const validPassword = bcrypt.compareSync(password, usuarioEmail.password);
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Password incorrecto",
        });
      }

      //Generar JWT
      const token = await generarJWT(usuarioEmail.id, usuarioEmail.nickname);

      res.status(200).json({
        ok: true,
        uid: usuarioNickname.id,
        name: usuarioNickname.nickname,
        token,
      });
    } else if (usuarioNickname) {
      const validPassword = bcrypt.compareSync(password, usuarioNickname.password);
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Password incorrecto",
        });
      }

      //Generar JWT
      const token = await generarJWT(usuarioNickname.id, usuarioNickname.nickname);

      res.status(200).json({
        ok: true,
        uid: usuarioNickname.id,
        name: usuarioNickname.nickname,
        token,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "El usuario y contraseña no es válido",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: "false",
      msg: "error en el sistema",
    });
  }
};

const renovarUsuario = async (req, res = response) => {
  const { uid, name } = req;
  //Generar JWT
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  crearUsuario: crearUsuario,
  login: loginUsuario,
  renew: renovarUsuario,
};
