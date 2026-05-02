const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    stats: {
        xp: { type: Number, default: 0 },
        quizzesCompleted: { type: Number, default: 0 },
        streak: { type: Number, default: 0 },
        lastQuizDate: { type: String, default: null }
    },
    topicProgress: {
        type: Map,
        of: new mongoose.Schema({
            quizzesTaken: { type: Number, default: 0 },
            totalScore: { type: Number, default: 0 },
            totalQuestions: { type: Number, default: 0 }
        })
    }
}, { timestamps: true });

// THIS IS THE CRUCIAL LINE. It turns the schema into a usable model.
module.exports = mongoose.model('User', userSchema);