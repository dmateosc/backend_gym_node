var env = require("dotenv").config();
//env(__dirname + "/" + process.env.NODE_ENV + ".env");


const MONGO_BASE = process.env.MONGO_BASE || "";
const MONGO_URL_GYM = process.env.MONGO_URL_GYM || "localhost:28017/gym";
const MONGO_PPR = process.env.MONGO_PPR || "";
const MONGO_USER = process.env.MONGO_USER  || "";
const USER_PPR = process.env.NODE_ENV != 'production' ? `${MONGO_USER}${MONGO_PPR}`: `${MONGO_USER}:${MONGO_PPR}` 
console.log(`${MONGO_BASE}${MONGO_USER}${MONGO_PPR}${MONGO_URL_GYM}`);
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  MONGO_CONNECT: `${MONGO_BASE}${USER_PPR}${MONGO_URL_GYM}`,
};
