import express from 'express';
import { param } from 'express-validator';

import {
    getMyFavourites,
    addFavourite,
    removeFavourite,
} from '../controllers/favouriteController.js';

import { protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

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

export default router;
