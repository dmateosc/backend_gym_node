//Se encarga de redireccionar el path asociado a cada uno de los controladores

"use strict";

var express = require("express");
var GymController = require("../controllers/gym");
var UserController = require("../controllers/user");
var TrainingController = require("../controllers/training");
var EjercicioController = require("../controllers/exercise");
const MusculoController = require("../controllers/muscle");

var router = express.Router();
var multer = require("multer");
// var multers3 = require("multer-s3")
const { validarJWT } = require("../middlewares/jwt-validator");
const {
  muscleStore,
  exerciseStore,
  userStore,
} = require("../middlewares/aws-connect");
const { response } = require("express");

router.use(validarJWT);

//Usuario
// router.get(
//   ["/user-nickname/:nickname", "/user-email/:email"],
//   UserController.getUser
// );

router.get("/user-id/:id", UserController.getUserById);
router.put("/user-status/:nickname", UserController.updateStatusUser);
router.put("/user-class/:nickname", UserController.updateClaseUser);
//router.post("/create-user", UserController.createUser);
//router.post("/login", UserController.login);

//Subida de imagenes
router.post(
  "/image-muscle-name/:nombre",
  // multiMiddlewareMuscle.single("image"),
  muscleStore.single("image"),
  GymController.uploadMusculoImage
);
router.post(
  ["/image-user/:id", "/image-user/:nombre"],
  userStore.single("image"),
  GymController.uploadUserImage
);
router.post(
  "/image-exercise/:nombre",
  exerciseStore.single("image"),
  GymController.uploadEjercicioImage
);
router.post(
  "/image-exercises",
  exerciseStore.array("image"),
  function (req, res = response, next) {
    console.log(req.body)
    return res.status(200).send("Uploaded");
  }
);
//obtener imagenes
router.get("/image/:image/:type", GymController.getImage);
//Entrenamientos
router.get("/training/:nickname/:day", TrainingController.getTrainingDay);
router.post("/training", TrainingController.createTraining);
//Ejercicios
router.get("/exercise/:nombre", EjercicioController.getEjercicio);
router.get("/exercises/:muscle", EjercicioController.getEjercicioByMuscle);
router.post("/create-exercise", EjercicioController.createEjercicio);
router.post("/create-exercises", EjercicioController.createEjercicios);
//Musculo
router.get("/muscle/:nombre", MusculoController.getMusculo);
router.get("/muscles", MusculoController.getMusculos);
router.post("/create-muscle", MusculoController.createMusculo);

module.exports = router;

/*

var userStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var muscleStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/muscles");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var exerciseStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/exercise");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var multiMiddlewareMuscle = multer({ storage: muscleStore });
var multiMiddlewareExercise = multer({ storage: exerciseStore });
var multiMiddlewareUser = multer({ storage: userStore });

*/