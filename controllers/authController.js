// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register a new user (defaults to role: 'biker')
// @route   POST /auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please include name, email, and password.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Create user (role defaults to 'biker')
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    // Return both token and user payload
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('🔴 registerUser error:', err);
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please include email and password.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'No user found with that email.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Incorrect password.' });
    }

    const token = generateToken(user._id);
    // Return both token and user payload
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('🔴 loginUser error:', err);
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
