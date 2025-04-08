// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { connectDb } = require('./config/db');
// const authRoutes = require('../src/routes/authRoute');
// const productRoutes = require('../src/routes/productRoute');
// // const bestSellerRoutes = require('../src/routes/bestSellerRoute');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from your frontend
//   methods: 'GET,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true
// }));

// // Enable pre-flight across-the-board
// app.options('*', cors());

// app.use(bodyParser.json());

// // Connect to database before starting server
// const startServer = async () => {
//   try {
//     await connectDb();

//     // Routes
//     app.get('/', (req, res) => {
//       res.send('API is running');
//     });

//     // Authentication routes
//     app.use('/api/auth', authRoutes);

//     // Product routes
//     app.use('/api/ourProduct', productRoutes);

  
//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();





// src/server.js
require('dotenv').config();
const cors = require('cors');
const { connectDb } = require("./config/db");
const app = require("./index");

const PORT = process.env.PORT || 3000;

// Add CORS middleware to your application
// This should be added in your index.js if that's where you define your Express app
// If app is already created in index.js, you'll need to add this there instead
if (!app.get('corsAdded')) {
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-production-frontend-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
  }));
  app.set('corsAdded', true);
}

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDb();
    
    // Start the server with all routes from index.js
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();