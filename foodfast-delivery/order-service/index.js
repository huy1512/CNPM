const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const orderRoutes = require("./src/routes/order");
const { consumePaymentEvents } = require("./src/rabbitmq/consumer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/orders", orderRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/orders_db";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB (Order Service)"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// RabbitMQ consumer
consumePaymentEvents().catch(console.error);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`🚀 Order Service running on port ${PORT}`);
});
