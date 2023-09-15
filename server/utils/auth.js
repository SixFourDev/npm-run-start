const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const secretKey = process.env.JWT_SECRET; // Ensure the .env file has this variable

function signToken(user) {
    const payload = {
        userId: user._id,
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function decodeToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

async function verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password);
}

async function createUser(username, email, password) {
    const newUser = new User({ username, email, password });
    await newUser.save();
    return newUser;
}

async function authenticateUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User Not Found');
    }

    const isPasswordValid = await verifyPassword(user, password);
    if (!isPasswordValid) {
        throw new Error('Invalid Email or Password');
    }

    const token = signToken(user); 
    return token;
}

module.exports = { 
    signToken,
    verifyPassword,
    createUser,
    authenticateUser,
    decodeToken  // Export the new function
};
