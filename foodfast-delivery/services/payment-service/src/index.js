const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");              // 👈 thêm dòng này
const paymentRoutes = require("./routes/Payment");
const { consumeOrderCreated } = require("./rabbitmq/consumer");

const app = express();

// 👇 Cho phép tất cả origin (test nhanh UI bằng Live Server)
app.use(cors());
app.use(express.json());

// Router
app.use("/payments", paymentRoutes);

// Kết nối MongoDB
mongoose.connect("mongodb://mongo:27017/payments_db")
  .then(() => {
    console.log("✅ MongoDB connected for Payment Service");
    app.listen(4002, () => console.log("🚀 Payment Service running on port 4002"));
    consumeOrderCreated(); // Bắt đầu lắng nghe queue
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
