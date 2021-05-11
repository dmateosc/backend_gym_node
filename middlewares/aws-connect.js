const AWS = require("aws-sdk");
const env = require("../config");

var multer = require("multer");
var multers3 = require("multer-s3");


AWS.config.update({ region: "eu-west-3" });

var s3 = new AWS.S3({ apiVersion: "2006-03-01" });


var muscleStore = multer({
  storage: multers3({
    s3: s3,
    bucket: "gym-file-storage/upload/muscles",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
});


var exerciseStore = multer({
  storage: multers3({
    s3: s3,
    bucket: "gym-file-storage/upload/exercises",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname)
    },
  }),
});


var userStore = multer({
  storage: multers3({
    s3: s3,
    bucket: "gym-file-storage/upload/user",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
});





module.exports = {
  muscleStore,
  userStore,
  exerciseStore,
  s3
};
