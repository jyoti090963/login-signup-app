require("dotenv").config();
const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URI; 

if (!mongo_url) {
  console.error("❌ MONGO_URI is undefined");
  process.exit(1);
}

mongoose.connect(mongo_url)
  .then(() => {
    console.log("✅ MongoDB Connected...");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });
