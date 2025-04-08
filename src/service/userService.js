const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider")

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password, role } = userData;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already exists with email: " + email);
        }
        password = await bcrypt.hash(password, 8);
        // Default role is Customer, unless specified
        const userRole = role || "Customer";
        const user = await User.create({ firstName, lastName, email, password, role: userRole });
        console.log("Created user", user);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createAdminUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already exists with email: " + email);
        }
        password = await bcrypt.hash(password, 8);
        const user = await User.create({ 
            firstName, 
            lastName, 
            email, 
            password,
            role: "ADMIN" // Setting admin role explicitly
        });
        console.log("Created admin user", user);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found with id: " + userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with email: " + email);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        
        const user = await findUserById(userId);
        if (!user) {
            throw new Error("User not found with id: " + userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateUserRole = async (userId, role) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found with id: " + userId);
        }
        
        user.role = role;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const checkUserRole = async (userId, requiredRole) => {
    try {
        const user = await findUserById(userId);
        return user.role === requiredRole;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUser,
    createAdminUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken, 
    getAllUsers,
    updateUserRole,
    checkUserRole
};