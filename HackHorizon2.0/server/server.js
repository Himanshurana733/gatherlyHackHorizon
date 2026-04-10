const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Schema
const eventSchema = new mongoose.Schema({
    title: String,
    category: String,
    date: String,
    location: String,
    description: String,
    likes: { type: Number, default: 0 }
});
const Event = mongoose.model('Event', eventSchema);

// Database Connection (Updated for Mongoose 7+)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✨ Connected to MongoDB Atlas'))
    .catch(err => console.log('❌ DB Error:', err.message));

// Routes
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ _id: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.patch('/api/events/:id/like', async (req, res) => {
    try {
        const updated = await Event.findByIdAndUpdate(
            req.params.id, 
            { $inc: { likes: 1 } }, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));