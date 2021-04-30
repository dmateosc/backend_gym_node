"use strict";

var Tabla = require("../models/tabla");
var User = require("../models/usuario");

// metodo para obener entrenamientos por dias

  const getTrainingDay = async (req, res) => {
    var params = req.params;
    var nickname = params.nickname;
    var day = params.day;

    if (day.length == 0) {
      day = Date.now();
    }
    try {
      
   
    const trainingTable = await Tabla.find(
      { nickname: nickname },
      { dias: { $exists: day } }) ;
        
      if(!trainingTable)
        return res.status(404).send("Entrenamiento no encontrado");
      
      return res.status(200).send({training: trainingTable});
      
    
  } catch (error) {
    return res
    .status(500)
    .send("Ha ocurrido un error al buscar el entrenamiento");
  }
  }


  /*Metodo para crear entrenamientos */
  const createTraining = async (req, res) => {
    var body = req.body;
    var nickname = body.nickname;
    var userId = body.idUsuario;
    var tabla = new Tabla();

    body.ejercicios.forEach((element) => {
      var ejercicios = {
        ejercicio: {
          nombre: element.ejercicio.nombre,
        },
        series: element.series.map((serie) => {
          return {
            peso: serie.peso,
            repeticiones: serie.repeticiones,
          };
        }),
      };
      tabla.ejercicios.push(ejercicios);
    });

    tabla.usuario = nickname;
    tabla.idUsuario = userId;
    tabla.dias = body.dias;

    try {
      const saved = await tabla.save() 
        
        if (!saved)
          return res.status(400).send("Entramiento no almacenado");
  
      const userTrainingSaved = await User.findOneAndUpdate(
          { nickname: nickname },
          {
            $push: {
              entrenamientos: trainingInsert._id,
            },
          }) 
        if (!userTrainingSaved)
          return res.status(400).send("Entramiento no almacenado");

        return res.status(200).send({
          message: "Se ha insertado correctamente",
        });
      
    } catch (error) {
      return res
      .status(500)
      .send("No se ha podido almacenar el entrenamiento");
    }
      
  }




module.exports = {getTrainingDay,createTraining};
