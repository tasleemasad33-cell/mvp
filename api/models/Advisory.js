import mongoose from 'mongoose';

const advisorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parcelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcel', required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, enum: ['fertilizer', 'water', 'health', 'harvest'], required: true },
    description: { type: String, required: true },
    confidence: { type: String, default: 'High' },
    source: { type: String },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export const Advisory = mongoose.model('Advisory', advisorySchema);
