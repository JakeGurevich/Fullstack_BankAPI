import mongoose from "mongoose";

const Account = mongoose.model("accounts", {
  user_id: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
    default: 0,
  },
  credit: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default Account;
