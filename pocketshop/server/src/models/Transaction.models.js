import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["funding", "transfer", "purchase"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    note: {
      type: String,
      default: "",
    },

    direction: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);