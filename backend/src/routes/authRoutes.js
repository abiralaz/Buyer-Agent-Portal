const express = require('express');
const { body } = require('express-validator');

const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/authController');

const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/register',
    [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 2 })
            .withMessage('Name must be at least 2 characters long'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),

        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),

        body('role')
            .optional()
            .isIn(['buyer', 'agent', 'admin'])
            .withMessage('Role must be buyer, agent, or admin'),
    ],
    validateRequest,
    registerUser
);

router.post(
    '/login',
    [
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),

        body('password').notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    loginUser
);

router.get('/me', protect, getMe);

module.exports = router;