const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid resource ID';
    }

    if (err.code === 11000) {
        statusCode = 409;
        message = 'Duplicate field value entered';
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};

module.exports = errorHandler;