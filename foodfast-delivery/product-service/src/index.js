const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/Product");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

mongoose.connect("mongodb://mongo:27017/products_db")
  .then(() => {
    console.log("✅ MongoDB connected for Product Service");
    app.listen(4001, () => console.log("🚀 Product Service running on port 4001"));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
