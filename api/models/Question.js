const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topic: { 
        type: String, 
        required: true,
        index: true // Indexed for faster querying by topic
    },
    question: { 
        type: String, 
        required: true 
    },
    options: [{ 
        type: String, 
        required: true 
    }],
    correctAnswer: { 
        type: String, 
        required: true 
    },
    difficulty: { 
        type: String, 
        enum: ['easy', 'medium', 'hard'], 
        default: 'medium' 
    }
});

module.exports = mongoose.model('Question', questionSchema);