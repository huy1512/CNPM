require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");
const productRoutes = require("./routes/Product");

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Product Service running on port ${PORT}`);
});
