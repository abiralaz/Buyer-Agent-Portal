const express = require('express');
const { body } = require('express-validator');

const { getProperties, createProperty } = require('../controllers/propertyController');
const { protect, adminOrAgent } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', getProperties);
router.post(
    '/',
    protect,
    adminOrAgent,
    [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('location').trim().notEmpty().withMessage('Location is required'),
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0'),
        body('image').trim().notEmpty().withMessage('Image URL is required'),
        body('description').trim().notEmpty().withMessage('Description is required'),
    ],
    validateRequest,
    createProperty
);

module.exports = router;