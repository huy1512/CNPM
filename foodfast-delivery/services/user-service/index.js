const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./src/routes/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/users_db";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB (User Service)"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
