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

module.exports = {
    getProperties,
};