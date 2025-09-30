const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  status: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
