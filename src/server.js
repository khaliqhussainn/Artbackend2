const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./config/db');
const authRoutes = require('../src/routes/authRoute');
const productRoutes = require('../src/routes/productRoute');
// const bestSellerRoutes = require('../src/routes/bestSellerRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true
    }));

// Enable pre-flight across-the-board
app.options('*', cors());

app.use(bodyParser.json());

// Connect to database before starting server
const startServer = async () => {
  try {
    await connectDb();

    // Routes
    app.get('/', (req, res) => {
      res.send('API is running');
    });

    // Authentication routes
    app.use('/api/auth', authRoutes);

    // Product routes
    app.use('/api/ourProduct', productRoutes);

  
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
