const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware'); // Protects these routes

// GET /api/user/stats - Fetch the user's data for the Dashboard
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Convert Mongoose Map to standard object & fix the "Node_js" issue
        const formattedTopicProgress = {};
        if (user.topicProgress) {
            for (const [key, value] of user.topicProgress.entries()) {
                // Convert "Node_js" back to "Node.js" for the frontend
                const originalTopic = key.replace(/_/g, '.');
                formattedTopicProgress[originalTopic] = value;
            }
        }

        // Send back a clean object to React
        const responseData = {
            ...user.toObject(),
            topicProgress: formattedTopicProgress
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Fetch stats error:", error);
        res.status(500).json({ message: "Server error while fetching stats." });
    }
});

// POST /api/user/update-stats - Update XP and progress after completing a quiz
router.post('/update-stats', auth, async (req, res) => {
    try {
        const { xpEarned, topic, score, totalQuestions } = req.body;
        
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Fix the MongoDB dot issue by replacing "." with "_"
        // Example: "Node.js" becomes "Node_js"
        const safeTopic = topic.replace(/\./g, '_');

        // 1. Update overall stats
        user.stats.xp += xpEarned;
        user.stats.quizzesCompleted += 1;

        // 2. Update specific topic progress
        if (!user.topicProgress) {
            user.topicProgress = new Map();
        }
        
        let currentTopicStats = user.topicProgress.get(safeTopic) || { 
            quizzesTaken: 0, 
            totalScore: 0, 
            totalQuestions: 0 
        };

        currentTopicStats.quizzesTaken += 1;
        currentTopicStats.totalScore += score;
        currentTopicStats.totalQuestions += totalQuestions;
        
        // Save it back to the map using the safe key
        user.topicProgress.set(safeTopic, currentTopicStats);

        // Save the updated user to the database
        await user.save();
        
        res.status(200).json({ 
            message: "Progress saved successfully!"
        });

    } catch (error) {
        console.error("Update stats error:", error);
        res.status(500).json({ message: "Server error while updating stats." });
    }
});

module.exports = router;