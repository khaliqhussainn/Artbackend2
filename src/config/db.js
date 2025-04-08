// const mongoose = require("mongoose")

// // const mongodburl = "mongodb+srv://vinicreation:FCsEsMTDAFU21Ur4@cluster0.7rvkhzb.mongodb.net/?retryWrites=true&w=majority"
// const mongodburl = "mongodb+srv://khaliqhussain9711:iLzccqnkw5rFZZFa@clusterresin.wc5matq.mongodb.net/?retryWrites=true&w=majority"

// const connectDb = () => {
//     return mongoose.connect(mongodburl);
// }

// module.exports={connectDb}



// src/config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file at the project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Get MongoDB URI from environment variables
const mongodburl = process.env.MONGODB_URI;

// Alternative connection string for development if environment variable is not set
const fallbackMongoUrl = "mongodb://localhost:27017/yourdbname";

// Log which connection string we're using (without revealing the actual string)
console.log("MongoDB URI: ", mongodburl ? "Using environment variable" : "Using fallback connection");

// Use the connection string from environment variables or fallback to the default
const connectionString = mongodburl || fallbackMongoUrl;

/**
 * Connects to MongoDB using mongoose
 * @returns {Promise} Mongoose connection promise
 */
const connectDb = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        
        await mongoose.connect(connectionString, {
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