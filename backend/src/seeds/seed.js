require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Property = require('../models/Property');
const Favourite = require('../models/Favourite');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding');

        await Favourite.deleteMany();
        await User.deleteMany();
        await Property.deleteMany();

        const hashedPassword = await bcrypt.hash('Password123', 10);

        const demoUser = await User.create({
            name: 'Demo Buyer',
            email: 'buyer@example.com',
            password: hashedPassword,
            role: 'buyer',
        });

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
        });

        const properties = await Property.insertMany([
            {
                title: 'Modern Family House',
                location: 'Kathmandu',
                price: 250000,
                image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
                description: 'A modern family house with spacious rooms and a peaceful neighborhood.',
            },
            {
                title: 'Luxury Apartment',
                location: 'Lalitpur',
                price: 180000,
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
                description: 'A stylish apartment located in the city with modern facilities.',
            },
            {
                title: 'Cozy Cottage',
                location: 'Bhaktapur',
                price: 120000,
                image: 'https://images.unsplash.com/photo-1448630360428-65456885c650',
                description: 'A cozy cottage perfect for a quiet lifestyle and scenic views.',
            },
            {
                title: 'City View Condo',
                location: 'Pokhara',
                price: 210000,
                image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
                description: 'A premium condo offering excellent city views and comfortable living.',
            },
            {
                title: 'Premium Villa',
                location: 'Chitwan',
                price: 320000,
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
                description: 'A premium villa with elegant interiors, garden space, and privacy.',
            },
        ]);

        console.log('Seed complete');
        console.log('Demo buyer:', demoUser.email, '/ Password123');
        console.log('Admin user:', adminUser.email, '/ Password123');
        console.log(`Seeded ${properties.length} properties`);

        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seedData();