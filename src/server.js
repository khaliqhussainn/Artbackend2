// require('dotenv').config();
// const { connectDb } = require("./config/db");
// const app = require("./index");

// const port = process.env.PORT || 3000;

// app.listen(port, async() => {
//     await connectDb();
//     console.log("server started on ", port);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDb } = require('./config/db');
const authRoutes = require('../src/routes/authRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());

// Connect to database before starting server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDb();

    // Routes
    app.get('/', (req, res) => {
      res.send('API is running');
    });

    // Authentication routes
    app.use('/api/auth', authRoutes);

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
