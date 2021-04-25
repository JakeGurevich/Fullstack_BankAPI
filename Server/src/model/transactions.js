import mongoose from "mongoose";

const Transaction = mongoose.model("transactions", {
  from_user_id: {
    type: String,
    required: true,
  },
  to_user_id: {
    type: String,
  },

  transaction_type: {
    type: String,
    required: true,
  },
  ammount: {
    type: Number,
    required: true,
  },
});

export default Transaction;
