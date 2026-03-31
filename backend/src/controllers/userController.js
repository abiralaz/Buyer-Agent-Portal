const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, 'name email role createdAt').sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: {
            users,
        },
    });
});

module.exports = {
    getAllUsers,
};
