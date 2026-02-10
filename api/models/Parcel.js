import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    crop: { type: String, required: true },
    variety: { type: String },
    area: { type: String, required: true },
    plantingDate: { type: String, required: true },
    harvestDate: { type: String },
    status: { type: String, default: 'Healthy' },
    healthScore: { type: Number, default: 80 },
    location: { type: String, required: true },
    soilPh: { type: String, default: '7.0' },
    soilOrganicMatter: { type: String, default: '2.5' },
    soilTexture: { type: String, default: 'Loamy' },
    color: { type: String, default: '#4ade80' },
    path: { type: String, default: "M20,20 L80,20 L90,80 L30,80 Z" },
    center: {
        x: { type: Number, default: 55 },
        y: { type: Number, default: 50 }
    },
    createdAt: { type: Date, default: Date.now }
});

export const Parcel = mongoose.model('Parcel', parcelSchema);
