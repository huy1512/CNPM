const Payment = require("../models/Payment");
const { publishPaymentEvent } = require("../rabbitmq/producer");
const { v4: uuidv4 } = require("uuid");

exports.processPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const idempotencyKey = uuidv4();

    // Giả lập thanh toán (90% thành công)
    const success = Math.random() < 0.9;

    const payment = new Payment({
      transactionId: uuidv4(),
      orderId,
      amount,
      status: success ? "SUCCESS" : "FAILED",
      idempotencyKey
    });

    await payment.save();

    // Gửi event cho Order Service
    publishPaymentEvent(payment);

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
