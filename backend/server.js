const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Initialize the app FIRST
const app = express();

// 2. Add Middlewares
app.use(cors());
app.use(express.json());

// 3. Add Routes (Now it knows what 'app' is!)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/user', require('./routes/user'));

// 4. Basic test route
app.get('/', (req, res) => {
    res.send('QuizMaster Backend is running da macha!');
});

// 5. Port & Database URL setup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
console.log("My MongoDB URL is:", process.env.MONGO_URI);
// 6. Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });