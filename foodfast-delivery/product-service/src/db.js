const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Product DB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}

module.exports = connectDB;
