const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  transactionId: String,
  orderId: String,
  amount: Number,
  status: { type: String, enum: ["SUCCESS", "FAILED"] },
  createdAt: { type: Date, default: Date.now },
  idempotencyKey: String
});

module.exports = mongoose.model("Payment", PaymentSchema);
