const bcrypt = require('bcryptjs');
const { matchedData } = require('express-validator');

const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'adminUser';

const registerUser = asyncHandler(async (req, res) => {
    const data = matchedData(req);

    const { name, email, password, role } = data;

    if (email === ADMIN_EMAIL) {
        return res.status(403).json({
            success: false,
            message: 'This email is reserved',
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'User with this email already exists',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const safeRole = role === 'agent' ? 'agent' : 'buyer';

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: safeRole,
    });

    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const data = matchedData(req);

    const { email, password } = data;

    let user = await User.findOne({ email }).select('+password');

    // Ensure the one allowed admin account always exists with fixed credentials.
    if (!user && email === ADMIN_EMAIL) {
        const adminHashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        user = await User.create({
            name: 'Admin User',
            email: ADMIN_EMAIL,
            password: adminHashedPassword,
            role: 'admin',
        });
        user = await User.findById(user._id).select('+password');
    }

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Current user fetched successfully',
        data: {
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
            },
        },
    });
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
};