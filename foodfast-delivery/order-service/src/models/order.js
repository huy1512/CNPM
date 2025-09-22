const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: "PENDING" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
