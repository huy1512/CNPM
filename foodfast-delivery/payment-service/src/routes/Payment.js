const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Payment = require("../models/Payment");
const router = express.Router();

// Tạo thanh toán
router.post("/", async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const payment = new Payment({
      orderId,
      amount,
      status: "success", // demo: luôn thành công
      transactionId: uuidv4(),
    });
    await payment.save();
    res.json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Trạng thái thanh toán
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Not found" });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
