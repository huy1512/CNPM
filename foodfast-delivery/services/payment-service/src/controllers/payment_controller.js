const Payment = require("../models/Payment");
const { publishPaymentEvent } = require("../rabbitmq/producer");

// 📌 Lấy tất cả payments (dùng cho Thunder test)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Lấy 1 payment theo id
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Tạo mới payment (giả lập thanh toán thành công)
exports.processPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ error: "orderId and amount are required" });
    }

    // tạo payment mới
    const payment = new Payment({
      transactionId: Date.now().toString(), // giả lập transactionId
      orderId,
      amount,
      status: "SUCCESS", // giả lập luôn thành công
      idempotencyKey: Date.now().toString()
    });

    await payment.save();

    // publish event sang RabbitMQ để Order Service nhận
    await publishPaymentEvent({
      orderId,
      status: "PAID",
      paymentId: payment._id.toString(),
      transactionId: payment.transactionId
    });

    res.json({ message: "Payment processed successfully", payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Xóa payment (test thêm)
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
