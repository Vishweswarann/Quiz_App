const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Initialize the app FIRST
const app = express();

// 2. Add Middlewares
app.use(cors());
app.use(express.json());

// 3. Add Routes 
app.use('/api/auth', require('../routes/auth'));
app.use('/api/quiz', require('../routes/quiz'));
app.use('/api/user', require('../routes/user'));

// 4. Basic test route
app.get('/', (req, res) => {
	res.send('QuizMaster Backend is running da macha!');
});

// 5. Database URL setup
const MONGO_URI = process.env.MONGO_URI;

// 6. Connect to MongoDB (Vercel still needs this to talk to your DB!)
mongoose.connect(MONGO_URI)
	.then(() => {
		console.log('MongoDB connected successfully!');
	})
	.catch((error) => {
		console.error('Database connection failed:', error);
	});

// 7. Start the server locally, but let Vercel handle it in production
if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
		console.log(`Server is running locally on port ${PORT}`);
	});
}

// 8. Export the app so Vercel can turn it into a serverless function
module.exports = app;
