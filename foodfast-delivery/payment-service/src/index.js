const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");
const paymentRoutes = require("./routes/payment");

const app = express();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Payment Service running on port ${PORT}`);
});
