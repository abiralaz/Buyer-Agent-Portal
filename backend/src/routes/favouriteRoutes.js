const express = require('express');
const { param } = require('express-validator');

const {
    getMyFavourites,
    addFavourite,
    removeFavourite,
} = require('../controllers/favouriteController');

const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);

router.get('/', getMyFavourites);

router.post(
    '/:propertyId',
    [
        param('propertyId')
            .notEmpty()
            .withMessage('Property ID is required'),
    ],
    validateRequest,
    addFavourite
);

router.delete(
    '/:propertyId',
    [
        param('propertyId')
            .notEmpty()
            .withMessage('Property ID is required'),
    ],
    validateRequest,
    removeFavourite
);

module.exports = router;