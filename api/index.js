
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from './models/User.js';
import { Parcel } from './models/Parcel.js';
import { Advisory } from './models/Advisory.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/farmconnect";
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware for auth
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error();
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoursecretkey');
        const user = await User.findById(decoded.id);
        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'yoursecretkey');
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'yoursecretkey');
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// --- PARCEL ROUTES ---

app.get('/api/parcels', auth, async (req, res) => {
    try {
        const parcels = await Parcel.find({ userId: req.user._id });
        res.send(parcels);
    } catch (e) {
        res.status(500).send();
    }
});

app.post('/api/parcels', auth, async (req, res) => {
    try {
        const parcel = new Parcel({ ...req.body, userId: req.user._id });
        await parcel.save();
        res.status(201).send(parcel);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/api/parcels/:id', auth, async (req, res) => {
    try {
        const parcel = await Parcel.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!parcel) return res.status(404).send();
        res.send(parcel);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete('/api/parcels/:id', auth, async (req, res) => {
    try {
        const parcel = await Parcel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!parcel) return res.status(404).send();
        res.send(parcel);
    } catch (e) {
        res.status(500).send();
    }
});

// --- ADVISORY ROUTES ---

app.get('/api/advisories', auth, async (req, res) => {
    try {
        const advisories = await Advisory.find({ userId: req.user._id });
        res.send(advisories);
    } catch (e) {
        res.status(500).send();
    }
});

app.post('/api/advisories', auth, async (req, res) => {
    try {
        const advisory = new Advisory({ ...req.body, userId: req.user._id });
        await advisory.save();
        res.status(201).send(advisory);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/api/advisories/:id', auth, async (req, res) => {
    try {
        const advisory = await Advisory.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!advisory) return res.status(404).send();
        res.send(advisory);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete('/api/advisories/:id', auth, async (req, res) => {
    try {
        const advisory = await Advisory.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!advisory) return res.status(404).send();
        res.send(advisory);
    } catch (e) {
        res.status(500).send();
    }
});

// For local testing
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
