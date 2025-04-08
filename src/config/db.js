// const mongoose = require("mongoose")

// // const mongodburl = "mongodb+srv://vinicreation:FCsEsMTDAFU21Ur4@cluster0.7rvkhzb.mongodb.net/?retryWrites=true&w=majority"
// const mongodburl = "mongodb+srv://khaliqhussain9711:iLzccqnkw5rFZZFa@clusterresin.wc5matq.mongodb.net/?retryWrites=true&w=majority"

// const connectDb = () => {
//     return mongoose.connect(mongodburl);
// }

// module.exports={connectDb}

// Update src/config/db.js
const mongoose = require("mongoose")

// Use environment variable or fallback to your dev database
const mongodburl = process.env.MONGODB_URI || "your_local_mongodb_uri"

const connectDb = () => {
    return mongoose.connect(mongodburl);
}

module.exports = { connectDb }