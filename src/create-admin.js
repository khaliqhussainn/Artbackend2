// Save as scripts/create-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/userModel');
const { connectDb } = require('../src/config/db');

const createAdminUser = async () => {
  try {
    await connectDb();
    console.log('Connected to MongoDB');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'khaliquehussain7@gmail.com', role: 'ADMIN' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create admin user
    const password = await bcrypt.hash('admin123', 8);
    const adminUser = new User({
      firstName: 'Khaliq',
      lastName: 'Hussain',
      email: 'khaliquehussain7@gmail.com',
      password: password,
      role: 'ADMIN',
      mobile: '1234567890'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();