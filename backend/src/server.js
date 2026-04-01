import 'dotenv/config';

import connectDB from './config/db.js';
import app from './app.js';

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err);
});

const PORT = process.env.PORT || 10000;

console.log('Starting app...');
console.log('PORT =', process.env.PORT);
console.log('MONGODB_URI exists =', !!process.env.MONGODB_URI);
console.log('JWT_SECRET exists =', !!process.env.JWT_SECRET);

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error('STARTUP ERROR:', error);
        process.exit(1);
    }
}

startServer();
