const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

function signToken(user) {
    const payload = {
        userId: user._id,
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h'}); // i will be adjusting the secret key to what the key we are getting from the jwt
};

// verifying the passwrod function
async function verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password);
};

//create user function
async function createUser(username, email, password) {
    const newUser = new User({ username, email, password });
    await newUser.save();
    return newUser;
};

//Authenticate User function
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
};