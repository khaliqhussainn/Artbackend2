// require('dotenv').config();
// const { connectDb } = require("./config/db");
// const app = require("./index");

// const port = process.env.PORT || 3000;

// app.listen(port, async() => {
//     await connectDb();
//     console.log("server started on ", port);
// });



// src/server.js
const express = require('express');
const { connectDb } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to database before starting server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDb();
    
    // Routes (add your routes here)
    app.get('/', (req, res) => {
      res.send('API is running');
    });
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();