import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Property title is required'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Property location is required'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Property price is required'],
            min: [0, 'Price cannot be negative'],
        },
        image: {
            type: String,
            required: [true, 'Property image is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Property description is required'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Property', propertySchema);
