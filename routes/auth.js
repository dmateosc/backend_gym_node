
const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, login, renew } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/fields-validator");
const { validarJWT } = require("../middlewares/jwt-validator");
const router = Router();

/* Rutas de Usuarios /auth
    host + /api/auth
*/
//Esto es para logarse
router.post("/login",[
    check("password", "El password no es válido").isStrongPassword(),
    validarCampos
  ], login);

//Para registrar un usuario
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password no es válido").isStrongPassword(),
    validarCampos
  ],
  crearUsuario
);

//Renovar el token
router.get("/renew",[validarJWT], renew);

module.exports = router;

