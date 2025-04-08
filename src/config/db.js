// const mongoose = require("mongoose")

// // const mongodburl = "mongodb+srv://vinicreation:FCsEsMTDAFU21Ur4@cluster0.7rvkhzb.mongodb.net/?retryWrites=true&w=majority"
// const mongodburl = "mongodb+srv://khaliqhussain9711:iLzccqnkw5rFZZFa@clusterresin.wc5matq.mongodb.net/?retryWrites=true&w=majority"

// const connectDb = () => {
//     return mongoose.connect(mongodburl);
// }

// module.exports={connectDb}






// src/config/db.js
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file
// Using path.resolve to ensure we find the .env file regardless of where the script is run from
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Get MongoDB URI from environment variables
const mongodburl = process.env.MONGODB_URI;

// Debug log to help troubleshoot
console.log("MongoDB URI detected:", mongodburl ? "URL found (not shown for security)" : "URL not found");

// Ensure the MongoDB URI is valid and available
if (!mongodburl) {
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
    
    await mongoose.connect(mongodburl, {
      // Modern versions of mongoose don't require these options, but adding for robustness
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = { connectDb };