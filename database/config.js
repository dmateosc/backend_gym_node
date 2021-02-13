const mongoose = require("mongoose");
const config = require("../config");



const dbConnection = async () => {
  try {
    await mongoose.connect(config.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de conectar a la Base de Datos");
  }

  console.log("DB Online");
};

module.exports = {
  dbConnection,
};