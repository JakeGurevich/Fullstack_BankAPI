import mongoose from "mongoose";

const User = mongoose.model("user", {
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
