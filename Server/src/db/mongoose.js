import mongoose from "mongoose";
const keys = require("../config/keys");

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
console.log("mongoose");
