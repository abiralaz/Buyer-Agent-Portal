import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import favouriteRoutes from './routes/favouriteRoutes.js';
import userRoutes from './routes/userRoutes.js';

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend is running',
    });
});

app.get('/', (req, res) => {
    res.send('Server running');
});

app.use('/api/auth', authRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/favourite', favouriteRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
