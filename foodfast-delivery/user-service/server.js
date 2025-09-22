const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./src/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/users";
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB (User Service)"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
