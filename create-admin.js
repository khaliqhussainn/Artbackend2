// Save as create-admin.js in your project root
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');

// Import the User model and DB connection
const User = require('./src/models/userModel');
const { connectDb } = require('./src/config/db');

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await connectDb();
    console.log('Connected to MongoDB');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'khaliquehussain7@gmail.com', role: 'ADMIN' });
    
    if (existingAdmin) {
      console.log('Admin user already exists with ID:', existingAdmin._id);
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      return;
    }
    
    // Create admin user with hashed password
    const password = await bcrypt.hash('admin123', 8);
    const adminUser = new User({
      firstName: 'Khaliq',
      lastName: 'Hussain',
      email: 'khaliquehussain7@gmail.com',
      password: password,
      role: 'ADMIN',
      mobile: '1234567890'
    });
    
    const savedAdmin = await adminUser.save();
    console.log('Admin user created successfully with ID:', savedAdmin._id);
    console.log('Use these credentials to login:');
    console.log('Email: khaliquehussain7@gmail.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the function
createAdminUser();