const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /api/quiz/questions/:topic
// Fetch questions for a specific topic
router.get('/questions/:topic', async (req, res) => {
    try {
        const topicName = req.params.topic;
        
        // Fetch 10 random questions for the requested topic
        const questions = await Question.aggregate([
            { $match: { topic: topicName } },
            { $sample: { size: 10 } }
        ]);

        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for this topic." });
        }

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching questions." });
    }
});

module.exports = router;