// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Email = require('./models/Email');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'https://www.mitronwear.com', // replace with your frontend URL

    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('DB Connection Error:', err));

// Route to store email
app.post('/api/join-waitlist', async (req, res) => {

    const { email } = req?.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        const savedEmail = new Email({ email });
        await savedEmail.save();
        res.status(200).json({ message: 'Email saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save email' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
