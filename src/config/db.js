// const mongoose = require("mongoose")

// // const mongodburl = "mongodb+srv://vinicreation:FCsEsMTDAFU21Ur4@cluster0.7rvkhzb.mongodb.net/?retryWrites=true&w=majority"
// const mongodburl = "mongodb+srv://khaliqhussain9711:iLzccqnkw5rFZZFa@clusterresin.wc5matq.mongodb.net/?retryWrites=true&w=majority"

// const connectDb = () => {
//     return mongoose.connect(mongodburl);
// }

// module.exports={connectDb}




// src/config/db.js - Fixed version
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file at the project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Get MongoDB URI from environment variables
const mongodburl = process.env.MONGODB_URI;

// Debug log to help troubleshoot
console.log("MongoDB URI detected:", mongodburl ? "URL found (not showing for security)" : "URL not found");

// Ensure the MongoDB URI is valid and available
if (!mongodburl) {
  console.error("MongoDB connection string not found. Make sure your .env file is in the correct location and contains MONGODB_URI");
  throw new Error('MongoDB connection string not found. Please check your .env file.');
}

if (!mongodburl.startsWith('mongodb://') && !mongodburl.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MongoDB connection string format. Please check your .env file.');
}

/**
 * Connects to MongoDB using mongoose
 * @returns {Promise} Mongoose connection promise
 */
const connectDb = async () => {
    try {
      console.log("Attempting to connect to MongoDB...");
      
      await mongoose.connect(mongodburl);
      
      console.log("MongoDB connected successfully");
      return mongoose.connection;
    } catch (err) {
      console.error("MongoDB connection error:", err);
      throw err;
    }
  };

module.exports = { connectDb };