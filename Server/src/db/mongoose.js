import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://Yakov:Moiparol2020$@cluster0.ufe6n.mongodb.net/bankdb-api?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  }
);
console.log("mongoose");
// tv.save()
//   .then(() => {
//     console.log(Product);
//   })
//   .catch((err) => {
//     console.log("Error!", err);
//   });
