const mongoose = require('mongoose');

const Favourite = require('../models/Favourite');
const Property = require('../models/Property');
const asyncHandler = require('../utils/asyncHandler');

const getMyFavourites = asyncHandler(async (req, res) => {
    const favourites = await Favourite.find({ user: req.user._id })
        .populate('property')
        .sort({ createdAt: -1 });

    const validFavourites = favourites.filter((item) => item.property);

    res.status(200).json({
        success: true,
        message: 'Favourites fetched successfully',
        data: {
            favourites: validFavourites,
        },
    });
});

const addFavourite = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid property ID',
        });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
        return res.status(404).json({
            success: false,
            message: 'Property not found',
        });
    }

    const existingFavourite = await Favourite.findOne({
        user: req.user._id,
        property: propertyId,
    });

    if (existingFavourite) {
        return res.status(409).json({
            success: false,
            message: 'Property already in favourites',
        });
    }

    const favourite = await Favourite.create({
        user: req.user._id,
        property: propertyId,
    });

    const populatedFavourite = await Favourite.findById(favourite._id).populate('property');

    res.status(201).json({
        success: true,
        message: 'Property added to favourites',
        data: {
            favourite: populatedFavourite,
        },
    });
});

const removeFavourite = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid property ID',
        });
    }

    const favourite = await Favourite.findOneAndDelete({
        user: req.user._id,
        property: propertyId,
    });

    if (!favourite) {
        return res.status(404).json({
            success: false,
            message: 'Favourite not found for this user',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Property removed from favourites',
    });
});

module.exports = {
    getMyFavourites,
    addFavourite,
    removeFavourite,
};