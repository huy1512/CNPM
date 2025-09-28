const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const orderRoutes = require("./src/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/orders", orderRoutes);

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/orders";
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB (Order Service)"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`🚀 Order Service running on port ${PORT}`);
});
