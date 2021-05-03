import mongoose from "mongoose";

const User = mongoose.model("user", {
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

export default User;
