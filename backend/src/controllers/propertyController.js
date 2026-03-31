const Property = require('../models/Property');
const asyncHandler = require('../utils/asyncHandler');

const getProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        message: 'Properties fetched successfully',
        data: {
            properties,
        },
    });
});

const createProperty = asyncHandler(async (req, res) => {
    const { title, location, price, image, description } = req.body;

    const property = await Property.create({
        title,
        location,
        price,
        image,
        description,
    });

    res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: {
            property,
        },
    });
});

module.exports = {
    getProperties,
    createProperty,
};